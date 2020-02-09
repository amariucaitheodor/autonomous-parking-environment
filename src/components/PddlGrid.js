import React from "react";
import { Rect } from "react-konva";

function PddlGrid(props) {
    if (!props.enabled)
        return (<></>);

    const pddlGridCellSize = { height: 150, width: 150 }
    const rows = Math.floor(props.parkingLotSize.width / pddlGridCellSize.width) + 1;
    const columns = Math.floor(props.parkingLotSize.height / pddlGridCellSize.height) + 1;

    let pddlCells = [], i, j;
    for (i = 0; i < rows; i++)
        for (j = 0; j < columns; j++) {
            pddlCells.push(
                <Rect
                    key={j + columns * i}
                    x={props.parkingLotOffset.x + i * pddlGridCellSize.width}
                    y={props.parkingLotOffset.y + j * pddlGridCellSize.height}
                    width={pddlGridCellSize.width}
                    height={pddlGridCellSize.height}
                    fillRadialGradientStartPoint={{ x: pddlGridCellSize.width / 2, y: pddlGridCellSize.height / 2 }}
                    fillRadialGradientEndPoint={{ x: pddlGridCellSize.width / 2, y: pddlGridCellSize.height / 2 }}
                    fillRadialGradientStartRadius={
                        pddlGridCellSize.width > pddlGridCellSize.height ?
                            pddlGridCellSize.height :
                            pddlGridCellSize.width
                    }
                    fillRadialGradientColorStops={
                        true ?
                            [0, "rgba(239, 14, 241, 0.1)", 1, "rgba(242, 62, 244, 0.1)"] :
                            [0, "rgba(141,38,38)", 1, "rgba(230,67,67)"]
                    }
                    shadowBlur={3}
                    stroke={"black"}
                    strokeWidth={0.5}
                />);
        }

    return (<>{pddlCells}</>);
}

export default PddlGrid;
