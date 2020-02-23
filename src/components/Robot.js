import React from "react";
import PropTypes from 'prop-types';
import { Image } from "react-konva";
import useImage from 'use-image';
const robotURL = require('../assets/robot.svg');

function Robot({ offset, gridCellSize, size, gridSize, toggleSimulation, robotGridStaticLocation, simulationOn, robotPath, changeRobotGridStaticLocation }) {
    const [robotImage] = useImage(robotURL);
    const shapeRef = React.useRef();

    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    const simulate = async () => {
        robotPath.shift();
        await asyncForEach(robotPath, async (nextStop) => {
            if (simulationOn) {
                // console.log("Moving to " + nextStop.column + ", " + nextStop.row);
                shapeRef.current.to({
                    x: fromGridToCanvas(nextStop).x,
                    y: fromGridToCanvas(nextStop).y,
                    duration: 1
                });
                await waitFor(1100);
                // console.log("Finished");
            }
        });
        toggleSimulation(false);
    }

    const setScale = (x, y) => {
        shapeRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    // TODO: find another way
    if (simulationOn) {
        simulate();
    }

    const propToGrid = (robotCanvasLocation) => {
        console.log(size.height);
        const cellColumn = Math.floor((robotCanvasLocation.x - size.width / 5) / size.width * gridSize.columns); // size.width/5 should account for horizontal offset
        const cellRow = Math.floor((robotCanvasLocation.y + 50) / size.height * gridSize.rows);

        if ((cellColumn >= 0 && cellColumn < gridSize.columns) && (cellRow >= 0 && cellRow < gridSize.rows)) {
            changeRobotGridStaticLocation(cellColumn, cellRow);
            var canvasLocation = fromGridToCanvas({ column: cellColumn, row: cellRow });
            shapeRef.current.to({
                x: canvasLocation.x,
                y: canvasLocation.y,
                duration: 0.1
            });
        }
        else {
            shapeRef.current.to({
                x: fromGridToCanvas(robotGridStaticLocation).x,
                y: fromGridToCanvas(robotGridStaticLocation).y,
                duration: 0.1
            });
        }
    };

    function fromGridToCanvas(position) {
        return {
            x: offset.x + position.column * gridCellSize.width,
            y: offset.y + position.row * gridCellSize.height - gridCellSize.height / 8
        };
    }

    return (
        <Image
            ref={shapeRef}
            x={fromGridToCanvas(robotGridStaticLocation).x}
            y={fromGridToCanvas(robotGridStaticLocation).y}
            width={gridCellSize.width}
            height={gridCellSize.height}
            image={robotImage}
            shadowBlur={0.5}
            draggable={!simulationOn}
            onDragStart={() => { setScale(1.1, 1.1) }}
            onDragEnd={() => {
                setScale(1, 1);
                console.log(shapeRef.current._lastPos);
                console.log(offset.x);
                propToGrid(shapeRef.current._lastPos);
            }}
        />
    );
}

Robot.propTypes = {
    offset: PropTypes.object.isRequired,
    gridCellSize: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    gridSize: PropTypes.object.isRequired,
    robotGridStaticLocation: PropTypes.object.isRequired,
    simulationOn: PropTypes.bool.isRequired,
    robotPath: PropTypes.array.isRequired,
    changeRobotGridStaticLocation: PropTypes.func.isRequired
};

export default Robot;

