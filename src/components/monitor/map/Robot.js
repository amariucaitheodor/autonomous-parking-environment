import React from "react";
import { Image, Arrow } from "react-konva";
import useImage from 'use-image';
import async from 'async';
const robotURL = require('../../../assets/images/robot.png');

function Robot({ simulatorInterface, configuration, robotLocation, carriedCar, gridCellSize, carImage, simulationOn, alreadyActivated, robotCommands, removeCar, addCar, size, parkingLotOffset, toggleSimulation, changeRobotGridLocation }) {
    const [robotImage] = useImage(robotURL);
    const simulatorRobotImageRef = React.useRef();
    const parkingRobotImageRef = React.useRef();
    let pathStop = [];

    for (var i = 0; i < robotCommands.length; i++) {
        let xCoord = parkingLotOffset.x + robotCommands[i].column * gridCellSize.width + gridCellSize.width / 2;
        let yCoord = parkingLotOffset.y + robotCommands[i].row * gridCellSize.height + gridCellSize.height / 2;
        pathStop.push(xCoord);
        pathStop.push(yCoord);
    }

    const setScale = (x, y) => {
        simulatorRobotImageRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    // TODO: STOP SIMULATION
    if (simulationOn && !alreadyActivated) {
        var count = 0;
        async.whilst(
            () => { return count < robotCommands.length - 1; },
            function (callback) {
                count++;

                if (robotCommands[count - 1].pickupCar)
                    removeCar(robotCommands[count - 1].row, robotCommands[count - 1].column, simulatorInterface);
                else if (robotCommands[count - 1].dropCar)
                    addCar(robotCommands[count - 1].row, robotCommands[count - 1].column, simulatorInterface);

                simulatorRobotImageRef.current.to({
                    x: fromGridToCanvas(robotCommands[count]).x,
                    y: fromGridToCanvas(robotCommands[count]).y,
                    duration: 1
                });
                setTimeout(callback, 1050);
            },
            function (_err) { // finally
                if (robotCommands[count].pickupCar)
                    removeCar(robotCommands[count].row, robotCommands[count].column, simulatorInterface);
                else if (robotCommands[count].dropCar)
                    addCar(robotCommands[count].row, robotCommands[count].column, simulatorInterface);

                toggleSimulation(false);
                changeRobotGridLocation({newColumn: robotCommands[count].column, newRow: robotCommands[count].row});
            }
        );
    }

    const propToGrid = (robotCanvasLocation) => {
        // (gridCellSize.width / 2, gridCellSize.height / 2) is the center of tile (0, 0)
        // But parkingLotOffset is also (gridCellSize.width / 2, gridCellSize.height / 2), so they cancel each other out
        // +1 because of padding cells 
        const cellColumn = Math.floor(robotCanvasLocation.x / size.width * (configuration[0].length + 1));
        const cellRow = Math.floor(robotCanvasLocation.y / size.height * (configuration.length + 1));
        var isOnBlockingSpace = false;
        if (configuration[cellRow] !== undefined &&
            configuration[cellRow][cellColumn] !== undefined &&
            configuration[cellRow][cellColumn].type === "blocked")
            isOnBlockingSpace = true;

        if ((cellColumn >= 0 && cellColumn < configuration[0].length) &&
            (cellRow >= 0 && cellRow < configuration.length) &&
            !isOnBlockingSpace) {
            changeRobotGridLocation({newColumn: cellColumn, newRow: cellRow});
            var canvasLocation = fromGridToCanvas({ column: cellColumn, row: cellRow });
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

    function fromGridToCanvas(position) {
        return {
            x: parkingLotOffset.x + position.column * gridCellSize.width,
            y: parkingLotOffset.y + position.row * gridCellSize.height - gridCellSize.height / 50
        };
    }

    return (
        <>
            {/* Robot path */}
            < Arrow
                points={pathStop}
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
                shadowBlur={0.5}
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
                image={carriedCar !== null ? carImage : robotImage}
                shadowBlur={0.5}
            />
        </>
    );
}

export default Robot;
