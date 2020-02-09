import React from "react";
import ParkingGroup from './ParkingGroup';
import PddlGrid from './PddlGrid';
import { Stage, Layer, Shape } from "react-konva";

function ParkingLot(props) {
    const upperLeftSquareSide = 275;
    const size = { height: 720, width: 1300 + upperLeftSquareSide };
    const offset = { x: 200, y: 10 };

    return (
        <div className="App" >
            <header className="App-header">
                <h3> {new Date().toLocaleString()} </h3>
                <Stage width={1900} height={800}>
                    <Layer>
                        <Shape
                            x={offset.x}
                            y={offset.y}
                            sceneFunc={(context, shape) => {
                                context.beginPath();
                                context.moveTo(upperLeftSquareSide, 0);
                                context.lineTo(upperLeftSquareSide, upperLeftSquareSide);
                                context.lineTo(0, upperLeftSquareSide);
                                context.lineTo(0, offset.y + size.height);
                                context.lineTo(size.width, offset.y + size.height);
                                context.lineTo(size.width, 0);
                                context.closePath();
                                // (!) Konva specific method, it is very important
                                context.fillStrokeShape(shape);
                            }}
                            fill={"white"}
                            stroke={"black"}
                            strokeWidth={5}
                        />
                        <ParkingGroup
                            columns={5}
                            horizontal={true}
                            offset={{ x: 475, y: 10 }}
                            spaces={props.spacesAvailable}
                            slice={[0, 10]}
                        />
                        <ParkingGroup
                            columns={2}
                            horizontal={false}
                            offset={{ x: 200, y: 285 }}
                            spaces={props.spacesAvailable}
                            slice={[10, 17]}
                        />
                        <PddlGrid
                        parkingLotSize={size}
                        parkingLotOffset={offset}
                        />
                    </Layer>
                </Stage>
            </header>
        </div>
    );
}

export default ParkingLot;
