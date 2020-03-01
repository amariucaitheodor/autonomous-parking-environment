import React from "react";
import { Image, Arrow } from "react-konva";
import useImage from 'use-image';
import async from 'async';
const robotURL = require('../../assets/images/robot.svg');

function Robot({ parkingLotConfiguration, robotGridStaticLocation, carriedCar, shiftPath, gridCellSize, carImage, simulationOn, alreadyActivated, robotPath, removeCar, addCar, gridSize, parkingLotOffset, size, toggleSimulation, changeRobotGridStaticLocation }) {
    const [robotImage] = useImage(robotURL);
    const robotImageRef = React.useRef();
    let pathStop = [];

    for (var i = 0; i < robotPath.length; i++) {
        let xCoord = parkingLotOffset.x + robotPath[i].column * gridCellSize.width + gridCellSize.width / 2;
        let yCoord = parkingLotOffset.y + robotPath[i].row * gridCellSize.height + gridCellSize.height / 2;
        pathStop.push(xCoord);
        pathStop.push(yCoord);
    }

    const setScale = (x, y) => {
        robotImageRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    // TODO: STOP SIMULATION
    if (simulationOn && !alreadyActivated) {
        var count = 0;
        async.whilst(
            () => { return count < robotPath.length - 1; },
            function (callback) {
                count++;

                if (robotPath[count - 1].pickupCar)
                    removeCar(robotPath[count - 1].row, robotPath[count - 1].column);
                else if (robotPath[count - 1].dropCar)
                    addCar(robotPath[count - 1].row, robotPath[count - 1].column);

                robotImageRef.current.to({
                    x: fromGridToCanvas(robotPath[count]).x,
                    y: fromGridToCanvas(robotPath[count]).y,
                    duration: 1
                });
                setTimeout(callback, 1050);
                // shiftPath();
            },
            function (_err) { // finally
                if (robotPath[count].pickupCar)
                    removeCar(robotPath[count].row, robotPath[count].column);
                else if (robotPath[count].dropCar)
                    addCar(robotPath[count].row, robotPath[count].column);

                toggleSimulation(false);
            }
        );
    }

    const propToGrid = (robotCanvasLocation) => {
        const cellColumn = Math.floor((robotCanvasLocation.x + gridCellSize.width / 2) / size.width * gridSize.columns);
        const cellRow = Math.floor((robotCanvasLocation.y + gridCellSize.height / 2) / size.height * gridSize.rows);
        var isOnBlockingSpace = false;
        if (parkingLotConfiguration[cellRow][cellColumn] === "blocked")
            isOnBlockingSpace = true;

        if ((cellColumn >= 0 && cellColumn < gridSize.columns) &&
            (cellRow >= 0 && cellRow < gridSize.rows) &&
            !isOnBlockingSpace) {
            changeRobotGridStaticLocation(cellColumn, cellRow);
            var canvasLocation = fromGridToCanvas({ column: cellColumn, row: cellRow });
        }
        else {
            canvasLocation = fromGridToCanvas(robotGridStaticLocation);
        }

        robotImageRef.current.to({
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
            {/* Robot's path */}
            < Arrow
                points={pathStop}
                shadowBlur={0.5}
                stroke={"black"}
                strokeWidth={1.7}
            />
            <Image
                ref={robotImageRef}
                x={fromGridToCanvas(robotGridStaticLocation).x}
                y={fromGridToCanvas(robotGridStaticLocation).y}
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carriedCar !== null ? carImage : robotImage}
                shadowBlur={0.5}
                draggable={!simulationOn}
                onDragStart={() => { setScale(1.2, 1.2) }}
                onDragEnd={() => {
                    setScale(1, 1);
                    propToGrid(robotImageRef.current._lastPos);
                }}
            />
        </>
    );
}

export default Robot;
