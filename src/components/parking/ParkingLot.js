import React from "react";
import ParkingGroup from './ParkingGroup';
import DebugGrid from '../debug/DebugGrid';
import DateTime from '../DateTime';
import { ButtonToolbar } from "react-bootstrap";
import { Stage, Layer, Shape } from "react-konva";

function ParkingLot(props) {
    const HEIGHT = 750;
    // this is 96cm
    const squareSideHeightRatio = 96 / 288;
    const upperLeftSquareSide = HEIGHT * squareSideHeightRatio;
    // height is 288cm, width is 401.4cm
    const widthHeightRatio = 401.4 / 288;
    const size = { height: HEIGHT, width: HEIGHT * widthHeightRatio };
    const offset = { x: 380, y: 10 };

    const debugGridDimensions = { rows: 6, columns: 4 };
    const debugGridCellSize = {
        height: size.height / 6,
        width: size.width / 4
    }
    let parkingPointers = [
        { i: 2, j: 1 },
        { i: 2, j: 2 },
        { i: 3, j: 1 },
        { i: 3, j: 2 },
        { i: 2, j: 3 },
        { i: 3, j: 3 },
        { i: 2, j: 4 },
        { i: 3, j: 4 }
    ]

    return (
        <div className="App" >
            <header className="App-header">
                <ButtonToolbar>
                    <DateTime />
                </ButtonToolbar>
                <Stage width={1900} height={825}>
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
                            cellSize={debugGridCellSize}
                            parkingPointers={parkingPointers}
                            horizontal={true}
                            offset={{ x: offset.x + upperLeftSquareSide, y: offset.y }}
                            spaces={props.spacesAvailable}
                            slice={[0, 8]}
                        />
                        {props.debugMode ?
                            <DebugGrid
                                debugGridCellSize={debugGridCellSize}
                                debugGridDimensions={debugGridDimensions}
                                parkingPointers={parkingPointers}
                                debugCellTypes={props.debugCellTypes}
                                upperLeftSquareSide={upperLeftSquareSide} // for pddl grid automatic generation
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
