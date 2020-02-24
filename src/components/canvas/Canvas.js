import React, { useState } from "react";
import PropTypes from 'prop-types';
import RobotPath from './RobotPath';
import { Stage, Layer, Shape, Image } from "react-konva";
import Map from './Map/Map';
import useImage from 'use-image';
import async from 'async';
const carURL = require('../../assets/images/racecar.svg');
const robotURL = require('../../assets/images/robot.svg');

function Canvas({
    spacesAvailable,
    debugMode,
    robotPath,
    toggleSimulation,
    robotGridStaticLocation,
    gridSize,
    simulationOn,
    changeRobotGridStaticLocation,
    setSpaceAvailable,
    setSpaceBusy
}) {
    const parkingLotOffset = { x: 0, y: 0 };
    const [stageHeight] = useState(850);
    // this is 96cm
    const squareSideHeightRatio = 96 / 288;
    const upperLeftSquareSide = stageHeight * squareSideHeightRatio;
    // height is 288cm, width is 401.4cm
    const widthHeightRatio = 401.4 / 288;
    const size = { height: stageHeight, width: stageHeight * widthHeightRatio };
    const gridCellSize = {
        height: size.height / gridSize.rows,
        width: size.width / gridSize.columns
    }
    const [carImage] = useImage(carURL);

    // function checkSize() {
    //     setStageHeight(window.innerHeight * 0.9);
    // }

    // useEffect(() => {
    //     checkSize();
    //     window.addEventListener("resize", checkSize);
    // }, []);

    const [robotImage] = useImage(robotURL);
    const shapeRef = React.useRef();

    const setScale = (x, y) => {
        shapeRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    // TODO: STOP SIMULATION
    if (simulationOn) {
        // starts robot movement along new path
        var count = 0;
        async.whilst(
            () => { return simulationOn && count < robotPath.length - 1; },
            function (callback) {
                count++;
                if (robotPath[count - 1].pickupCar)
                    setSpaceAvailable(robotPath[count - 1].row, robotPath[count - 1].column);
                else if (robotPath[count - 1].dropCar)
                    setSpaceBusy(robotPath[count - 1].row, robotPath[count - 1].column);
                shapeRef.current.to({
                    x: fromGridToCanvas(robotPath[count]).x,
                    y: fromGridToCanvas(robotPath[count]).y,
                    duration: 1
                });
                setTimeout(callback, 1050);
            },
            function (_err) {
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
            x: parkingLotOffset.x + position.column * gridCellSize.width,
            y: parkingLotOffset.y + position.row * gridCellSize.height - gridCellSize.height / 8
        };
    }

    return (
        <Stage
            width={parkingLotOffset.x + size.width + 5}
            height={size.height}
        // style={{
        //     textAlign: "center",
        //     border: "3px solid black",
        //     background: "radial-gradient(ellipse at top, #e66465, transparent), radial-gradient(ellipse at bottom, #4d9f0c, transparent)"
        // }}
        >
            <Layer>
                <Shape // Parking Lot
                    x={parkingLotOffset.x}
                    y={parkingLotOffset.y}
                    sceneFunc={(context, shape) => {
                        context.beginPath();
                        context.moveTo(upperLeftSquareSide, 0);
                        context.lineTo(upperLeftSquareSide, upperLeftSquareSide);
                        context.lineTo(0, upperLeftSquareSide);
                        context.lineTo(0, size.height);
                        context.lineTo(size.width, size.height);
                        context.lineTo(size.width, 0);
                        context.closePath();
                        // (!) Konva specific method, it is very important
                        context.fillStrokeShape(shape);
                    }}
                    fillRadialGradientStartPoint={{ x: size.width / 2, y: size.height / 2 }}
                    fillRadialGradientEndPoint={{ x: size.width / 2, y: size.height / 2 }}
                    fillRadialGradientStartRadius={size.width > size.height ? size.height : size.width}
                    fillRadialGradientColorStops={[
                        0, "rgb(190, 190, 190)",
                        1, "rgb(255, 255, 255)"
                    ]}
                    stroke={"black"}
                    strokeWidth={5}
                />
                <Map
                    carImage={carImage}
                    spacesAvailable={spacesAvailable}
                    debugMode={debugMode}
                    gridCellSize={gridCellSize}
                    offset={parkingLotOffset}
                />
                <RobotPath
                    gridCellSize={gridCellSize}
                    robotPath={robotPath}
                    parkingLotOffset={parkingLotOffset}
                />
                <Image
                    ref={shapeRef}
                    x={fromGridToCanvas(robotGridStaticLocation).x}
                    y={fromGridToCanvas(robotGridStaticLocation).y}
                    width={gridCellSize.width}
                    height={gridCellSize.height}
                    image={robotImage}
                    shadowBlur={0.5}
                    draggable={!simulationOn}
                    onDragStart={() => { setScale(1.2, 1.2) }}
                    onDragEnd={() => {
                        setScale(1, 1);
                        propToGrid(shapeRef.current._lastPos);
                    }}
                />
            </Layer>
        </Stage>
    );
}

Canvas.propTypes = {
    toggleSimulation: PropTypes.func.isRequired,
    gridSize: PropTypes.object.isRequired,
    robotGridStaticLocation: PropTypes.object.isRequired,
    robotPath: PropTypes.array.isRequired,
    spacesAvailable: PropTypes.array.isRequired,
    debugMode: PropTypes.bool.isRequired,
    changeRobotGridStaticLocation: PropTypes.func.isRequired,
    simulationOn: PropTypes.bool.isRequired
};

export default Canvas;
