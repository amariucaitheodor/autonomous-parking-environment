import React from "react";
import ParkingGroup from './ParkingGroup';
import PddlGrid from '../pddl/PddlGrid';
import DateTime from '../DateTime';
import { ButtonToolbar } from "react-bootstrap";
import { Stage, Layer, Shape } from "react-konva";

function ParkingLot(props) {
    const upperLeftSquareSide = 275;
    const size = { height: 730, width: 1300 + upperLeftSquareSide };
    const offset = { x: 150, y: 10 };

    return (
        <div className="App" >
            <header className="App-header">
                <ButtonToolbar>
                    <DateTime />
                </ButtonToolbar>
                <Stage width={1900} height={750}>
                    <Layer>
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
                        <ParkingGroup
                            columns={8}
                            horizontal={true}
                            offset={{ x: offset.x + upperLeftSquareSide, y: offset.y }}
                            spaces={props.spacesAvailable}
                            slice={[0, 16]}
                        />
                        <ParkingGroup
                            columns={3}
                            horizontal={false}
                            offset={{ x: offset.x, y: offset.y + upperLeftSquareSide }}
                            spaces={props.spacesAvailable}
                            slice={[16, 25]}
                        />
                        {props.debugMode ?
                            <PddlGrid
                                stringColors={props.stringColors}
                                upperLeftSquareSide={upperLeftSquareSide} // for pddl grid automatic generation
                                gridDimentions={{ rows: 5, columns: 19 }}
                                parkingLotSize={size}
                                parkingLotOffset={offset}
                            /> :
                            null
                        }
                    </Layer>
                </Stage>
            </header>
        </div>
    );
}

export default ParkingLot;
