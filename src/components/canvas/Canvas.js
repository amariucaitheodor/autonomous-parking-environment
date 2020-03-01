import React, { useState, useEffect } from "react";
import { Stage, Layer, Shape } from "react-konva";
import useImage from 'use-image';
import Map from './Map/Map';
const carURL = require('../../assets/images/racecar.svg');

function Canvas({
    parkingLotConfiguration,
    cars,
    carriedCar,
    debugMode,
    robotPath,
    toggleSimulation,
    robotGridStaticLocation,
    gridSize,
    simulationOn,
    changeRobotGridStaticLocation,
    removeCar,
    addCar,
    alreadyActivated,
    resizable,
    shiftPath
}) {
    const [carImage] = useImage(carURL);
    const parkingLotOffset = { x: 0, y: 0 };
    const [stageHeight, setStageHeight] = useState(850);
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

    function checkSize() {
        setStageHeight(window.innerHeight * 0.9);
    }

    useEffect(() => {
        if (resizable) {
            checkSize();
            window.addEventListener("resize", checkSize);
        }
    }, [resizable]);


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
                    parkingLotConfiguration={parkingLotConfiguration}
                    carImage={carImage}
                    cars={cars}
                    debugMode={debugMode}
                    gridCellSize={gridCellSize}
                    offset={parkingLotOffset}
                    simulationOn={simulationOn}
                    alreadyActivated={alreadyActivated}
                    robotPath={robotPath}
                    removeCar={removeCar}
                    addCar={addCar}
                    gridSize={gridSize}
                    parkingLotOffset={parkingLotOffset}
                    size={size}
                    toggleSimulation={toggleSimulation}
                    changeRobotGridStaticLocation={changeRobotGridStaticLocation}
                    shiftPath={shiftPath}
                    carriedCar={carriedCar}
                    robotGridStaticLocation={robotGridStaticLocation}
                />
            </Layer>
        </Stage>
    );
}

export default Canvas;
