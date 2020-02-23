import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import RobotPath from './RobotPath';
import { Stage, Layer, Shape } from "react-konva";
import CarFactory from './CarFactory';
import Map from './Map';
import Robot from './Robot';
import useImage from 'use-image';
const carURL = require('../assets/racecar.svg');

function Canvas({ spacesAvailable, debugMode, robotPath, toggleSimulation, robotGridStaticLocation, gridSize, simulationOn, changeRobotGridStaticLocation }) {
    const parkingLotOffset = { x: 0, y: 0 };
    const [stageHeight, setStageHeight] = useState(0);
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

    function checkSize() {
        setStageHeight(window.innerHeight * 0.9);
    }

    useEffect(() => {
        checkSize();
        window.addEventListener("resize", checkSize);
    }, []);

    return (
        <Stage
            width={parkingLotOffset.x + size.width + gridCellSize.width + gridCellSize.width / 3 + 5}
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
                {simulationOn ? null :
                    <CarFactory
                        carImage={carImage}
                        gridCellSize={gridCellSize}
                        parkingLotOffset={parkingLotOffset}
                        size={size}
                    />
                    }
                <RobotPath
                    gridCellSize={gridCellSize}
                    robotPath={robotPath}
                    parkingLotOffset={parkingLotOffset}
                />
                <Robot
                toggleSimulation={toggleSimulation}
                    changeRobotGridStaticLocation={changeRobotGridStaticLocation}
                    offset={parkingLotOffset}
                    gridCellSize={gridCellSize}
                    size={size}
                    gridSize={gridSize}
                    robotGridStaticLocation={robotGridStaticLocation}
                    simulationOn={simulationOn}
                    robotPath={robotPath}
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
