import React, { useState } from "react";
import { Image } from "react-konva";
import useImage from 'use-image';
import async from 'async';
const robotURL = require('../../assets/images/robot.svg');

function Robot({ robotGridStaticLocation, gridCellSize, carImage, simulationOn, alreadyActivated, robotPath, setSpaceAvailable, setSpaceBusy, gridSize, parkingLotOffset, size, toggleSimulation, changeRobotGridStaticLocation }) {
    const [isCarryingCar, setIsCarryingCar] = useState(false);
    const [robotImage] = useImage(robotURL);
    const robotImageRef = React.useRef();

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
                if (robotPath[count - 1].pickupCar) {
                    setIsCarryingCar(true);
                    setSpaceAvailable(robotPath[count - 1].row, robotPath[count - 1].column);
                }
                else if (robotPath[count - 1].dropCar) {
                    setIsCarryingCar(false);
                    setSpaceBusy(robotPath[count - 1].row, robotPath[count - 1].column);
                }
                robotImageRef.current.to({
                    x: fromGridToCanvas(robotPath[count]).x,
                    y: fromGridToCanvas(robotPath[count]).y,
                    duration: 1
                });
                setTimeout(callback, 1050);
            },
            function (_err) { // finally
                if (robotPath[count].pickupCar) {
                    setIsCarryingCar(true);
                    setSpaceAvailable(robotPath[count].row, robotPath[count].column);
                }
                else if (robotPath[count].dropCar) {
                    setIsCarryingCar(false);
                    setSpaceBusy(robotPath[count].row, robotPath[count].column);
                }
                toggleSimulation(false);
            }
        );
    }

    const propToGrid = (robotCanvasLocation) => {
        const cellColumn = Math.floor((robotCanvasLocation.x + gridCellSize.width / 2) / size.width * gridSize.columns);
        const cellRow = Math.floor((robotCanvasLocation.y + gridCellSize.height / 2) / size.height * gridSize.rows);

        if ((cellColumn >= 0 && cellColumn < gridSize.columns) && (cellRow >= 0 && cellRow < gridSize.rows)) {
            changeRobotGridStaticLocation(cellColumn, cellRow);
            var canvasLocation = fromGridToCanvas({ column: cellColumn, row: cellRow });
            robotImageRef.current.to({
                x: canvasLocation.x,
                y: canvasLocation.y,
                duration: 0.1
            });
        }
        else {
            robotImageRef.current.to({
                x: fromGridToCanvas(robotGridStaticLocation).x,
                y: fromGridToCanvas(robotGridStaticLocation).y,
                duration: 0.1
            });
        }
    };

    function fromGridToCanvas(position) {
        return {
            x: parkingLotOffset.x + position.column * gridCellSize.width,
            y: parkingLotOffset.y + position.row * gridCellSize.height - gridCellSize.height / 50
        };
    }

    return (
        <Image
            ref={robotImageRef}
            x={fromGridToCanvas(robotGridStaticLocation).x}
            y={fromGridToCanvas(robotGridStaticLocation).y}
            width={gridCellSize.width}
            height={gridCellSize.height}
            image={isCarryingCar ? carImage : robotImage}
            shadowBlur={0.5}
            draggable={!simulationOn}
            onDragStart={() => { setScale(1.2, 1.2) }}
            onDragEnd={() => {
                setScale(1, 1);
                propToGrid(robotImageRef.current._lastPos);
            }}
        />
    );
}

export default Robot;
