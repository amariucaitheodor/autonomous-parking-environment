import React from "react";
import PropTypes from 'prop-types';
import RobotPath from './RobotPath';
// import DateTime from './DateTime';
import { Stage, Layer, Shape, Image } from "react-konva";
import Map from './Map';
import useImage from 'use-image';
const robotURL = require('../assets/robot.svg');

function Canvas({ spacesAvailable, debugMode, robotPath, robotLocation, gridSize }) {
    const HEIGHT = 750;
    // this is 96cm
    const squareSideHeightRatio = 96 / 288;
    const upperLeftSquareSide = HEIGHT * squareSideHeightRatio;
    // height is 288cm, width is 401.4cm
    const widthHeightRatio = 401.4 / 288;
    const size = { height: HEIGHT, width: HEIGHT * widthHeightRatio };
    const offset = { x: (window.innerWidth - 30) / 2 - size.width / 2, y: 50 };
    const debugGridCellSize = {
        height: size.height / gridSize.x,
        width: size.width / gridSize.y
    }
    const [robotImage] = useImage(robotURL);

    return (
        <div >
            {/* <DateTime /> */}
            <Stage width={1500} height={835}>
                <Layer>
                    {/* Parking Lot Shape  */}
                    <Shape
                        x={offset.x}
                        y={offset.y}
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
                        spacesAvailable={spacesAvailable}
                        debugMode={debugMode}
                        debugGridCellSize={debugGridCellSize}
                        offset={offset}
                    />
                    <RobotPath
                        debugGridCellSize={debugGridCellSize}
                        robotPath={robotPath}
                        parkingLotOffset={offset}
                    />
                    <Image
                        x={offset.x + robotLocation.x * debugGridCellSize.width + 80}
                        y={offset.y + robotLocation.y * debugGridCellSize.height}
                        scale={{ x: 0.8, y: 0.8 }}
                        image={robotImage}
                        shadowBlur={5}
                    />
                </Layer>
            </Stage>
        </div>
    );
}

Canvas.propTypes = {
    gridSize: PropTypes.object.isRequired,
    robotLocation: PropTypes.object.isRequired,
    robotPath: PropTypes.array.isRequired,
    spacesAvailable: PropTypes.array.isRequired,
    debugMode: PropTypes.bool.isRequired
};

export default Canvas;
