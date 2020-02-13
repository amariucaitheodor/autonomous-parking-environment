import React from "react";
import PropTypes from 'prop-types';
import RobotPath from './RobotPath';
import DateTime from './DateTime';
import { Stage, Layer, Shape } from "react-konva";
import Map from './Map';

function Canvas({ spacesAvailable, debugMode, robotPath }) {
    const HEIGHT = 750;
    // this is 96cm
    const squareSideHeightRatio = 96 / 288;
    const upperLeftSquareSide = HEIGHT * squareSideHeightRatio;
    // height is 288cm, width is 401.4cm
    const widthHeightRatio = 401.4 / 288;
    const size = { height: HEIGHT, width: HEIGHT * widthHeightRatio };
    const offset = { x: (window.innerWidth - 30) / 2 - size.width / 2, y: 30 };
    const debugGridCellSize = {
        height: size.height / 6,
        width: size.width / 4
    }

    return (
        <div className="App">
                <DateTime/>
                <Stage width={1800} height={835}>
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
                            fill={"white"}
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
                    </Layer>
                </Stage>
        </div>
    );
}

Canvas.propTypes = {
    robotPath: PropTypes.array.isRequired,
    spacesAvailable: PropTypes.array.isRequired,
    debugMode: PropTypes.bool.isRequired
};

export default Canvas;
