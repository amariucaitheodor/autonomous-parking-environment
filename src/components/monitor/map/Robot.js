import React, { useState, useEffect } from "react";
import { Image, Arrow, Layer } from "react-konva";
import useImage from 'use-image';
const robotURL = require('../../../assets/monitor_icons/robot.png');
const carURL = require('../../../assets/monitor_icons/racecar.png');

function Robot({ globalPlanView, parkingLotOffset, fromGridToCanvas, fromCanvasToGrid, simulatorInterface, configuration, robotLocation, carriedCar, gridCellSize, simulationOn, alreadyActivated, robotCommands, liftCarFromTile, dropCarOnTile, toggleSimulation, changeRobotGridLocation }) {
    const simulatorRobotImageRef = React.useRef();
    const parkingRobotImageRef = React.useRef();
    const [robotImage] = useImage(robotURL); // this causes a refresh
    const [carImage] = useImage(carURL); // this causes second refresh
    const [activePath, setActivePath] = useState([]);
    const [localPathsProgress, setLocalPathsProgress] = useState(0);
    console.log("Refreshing Robot")

    const setScale = (x, y) => {
        simulatorRobotImageRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    useEffect(() => {
        console.log("UPDATED fromGridToCanvas to " + fromGridToCanvas({ row: 0, column: 0 }).x)

        function initializeLocalPathsArray() {
            let localPathsArray = [];
            let newPathStop = [];
            for (var i = 0; i < robotCommands.length; i++) {
                let xCoord = parkingLotOffset.x + robotCommands[i].column * gridCellSize.width + gridCellSize.width / 2;
                let yCoord = parkingLotOffset.y + robotCommands[i].row * gridCellSize.height + gridCellSize.height / 2;
                newPathStop.push(xCoord);
                newPathStop.push(yCoord);
                if (robotCommands[i].pickupCar || robotCommands[i].dropCar) {
                    localPathsArray.push(newPathStop);
                    newPathStop = [];
                    let xCoord = parkingLotOffset.x + robotCommands[i].column * gridCellSize.width + gridCellSize.width / 2;
                    let yCoord = parkingLotOffset.y + robotCommands[i].row * gridCellSize.height + gridCellSize.height / 2;
                    newPathStop.push(xCoord);
                    newPathStop.push(yCoord);
                }
            }
            setActivePath(localPathsArray[localPathsProgress]);
        }

        function initializeGlobalPath() {
            let globalPath = [];
            for (var i = 0; i < robotCommands.length; i++) {
                let xCoord = parkingLotOffset.x + robotCommands[i].column * gridCellSize.width + gridCellSize.width / 2;
                let yCoord = parkingLotOffset.y + robotCommands[i].row * gridCellSize.height + gridCellSize.height / 2;
                globalPath.push(xCoord);
                globalPath.push(yCoord);
            }
            setActivePath(globalPath);
        }

        function executeSimulation(index, givenCommmands) {
            if (index > givenCommmands.length) {
                toggleSimulation(false);
                changeRobotGridLocation({
                    newColumn: robotCommands[robotCommands.length - 1].column,
                    newRow: robotCommands[robotCommands.length - 1].row
                });
                return;
            }

            if (robotCommands[index - 1].pickupCar || robotCommands[index - 1].dropCar) {
                setLocalPathsProgress(localPathsProgress => localPathsProgress + 1);
            }

            if (givenCommmands[index - 1].pickupCar !== undefined)
                liftCarFromTile(
                    givenCommmands[index - 1].row,
                    givenCommmands[index - 1].column,
                    simulatorInterface
                );
            else if (givenCommmands[index - 1].dropCar !== undefined)
                dropCarOnTile(
                    givenCommmands[index - 1].row,
                    givenCommmands[index - 1].column,
                    simulatorInterface
                );

            if (index !== givenCommmands.length) {
                simulatorRobotImageRef.current.to({
                    x: parkingLotOffset.x + givenCommmands[index].column * gridCellSize.width,
                    y: parkingLotOffset.y + givenCommmands[index].row * gridCellSize.height - gridCellSize.height / 50,
                    duration: 1
                });
            }

            index += 1;
            setTimeout(executeSimulation.bind({}, index, givenCommmands), 1050);
        }

        if (globalPlanView)
            initializeGlobalPath();
        else
            initializeLocalPathsArray();

        if (simulationOn && !alreadyActivated) {
            setLocalPathsProgress(0);
            executeSimulation(1, robotCommands);
        }
    }, [localPathsProgress, simulationOn, alreadyActivated, changeRobotGridLocation, dropCarOnTile, liftCarFromTile, fromGridToCanvas, globalPlanView, gridCellSize, parkingLotOffset, robotCommands, simulatorInterface, toggleSimulation]);

    const propToGrid = (robotCanvasLocation) => {
        var robotGridLocation = fromCanvasToGrid(robotCanvasLocation);

        if ((robotGridLocation.column >= 0 && robotGridLocation.column < configuration[0].length) &&
            (robotGridLocation.row >= 0 && robotGridLocation.row < configuration.length)) {
            changeRobotGridLocation({ newColumn: robotGridLocation.column, newRow: robotGridLocation.row });
            var canvasLocation = fromGridToCanvas({ column: robotGridLocation.column, row: robotGridLocation.row });
        }
        else {
            canvasLocation = fromGridToCanvas(robotLocation);
        }

        simulatorRobotImageRef.current.to({
            x: canvasLocation.x,
            y: canvasLocation.y,
            duration: 0.1
        });
    };

    return (
        <Layer>
            {/* Robot path */}
            < Arrow
                points={activePath}
                shadowBlur={0.5}
                stroke={"black"}
                strokeWidth={0.7}
            />
            {/* Simulator robot is asyncronous, hence two robot images! */}
            <Image
                ref={simulatorRobotImageRef}
                x={fromGridToCanvas(robotLocation).x}
                y={fromGridToCanvas(robotLocation).y}
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carriedCar !== null ? carImage : robotImage}
                shadowBlur={5}
                draggable={!simulationOn}
                visible={simulatorInterface}
                onDragStart={() => { setScale(1.2, 1.2) }}
                onDragEnd={() => {
                    setScale(1, 1);
                    propToGrid(simulatorRobotImageRef.current._lastPos);
                }}
            />
            <Image
                ref={parkingRobotImageRef}
                x={fromGridToCanvas(robotLocation).x}
                y={fromGridToCanvas(robotLocation).y}
                width={gridCellSize.width}
                height={gridCellSize.height}
                visible={!simulatorInterface}
                listening={false}
                image={carriedCar !== null ? carImage : robotImage}
                shadowBlur={5}
            />
        </Layer>
    );
}

export default Robot;
