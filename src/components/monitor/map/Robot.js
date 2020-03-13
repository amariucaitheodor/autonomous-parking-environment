import React from "react";
import { Image, Arrow } from "react-konva";
import useImage from 'use-image';
import async from 'async';
const robotURL = require('../../../assets/images/robot.png');

function Robot({ fromGridToCanvas, fromCanvasToGrid, simulatorInterface, configuration, robotLocation, carriedCar, gridCellSize, carImage, simulationOn, alreadyActivated, robotCommands, liftCarFromTile, dropCarOnTile, parkingLotOffset, toggleSimulation, changeRobotGridLocation }) {
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
                    liftCarFromTile(robotCommands[count - 1].row, robotCommands[count - 1].column, simulatorInterface);
                else if (robotCommands[count - 1].dropCar)
                    dropCarOnTile(robotCommands[count - 1].row, robotCommands[count - 1].column, simulatorInterface);

                simulatorRobotImageRef.current.to({
                    x: fromGridToCanvas(robotCommands[count]).x,
                    y: fromGridToCanvas(robotCommands[count]).y,
                    duration: 1
                });
                setTimeout(callback, 1050);
            },
            function (_err) { // finally
                if (robotCommands[count].pickupCar)
                    liftCarFromTile(robotCommands[count].row, robotCommands[count].column, simulatorInterface);
                else if (robotCommands[count].dropCar)
                    dropCarOnTile(robotCommands[count].row, robotCommands[count].column, simulatorInterface);

                toggleSimulation(false);
                changeRobotGridLocation({ newColumn: robotCommands[count].column, newRow: robotCommands[count].row });
            }
        );
    }

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
                listening={false}
                image={carriedCar !== null ? carImage : robotImage}
                shadowBlur={0.5}
            />
        </>
    );
}

export default Robot;
