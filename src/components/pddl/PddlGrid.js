import React from "react";
import { Rect } from "react-konva";

function PddlGrid(props) {
    const pddlGridCellSize = {
        height: props.parkingLotSize.height / props.gridDimentions.rows,
        width: props.parkingLotSize.width / props.gridDimentions.columns
    }

    const cellTypes = Object.freeze({
        "blocking-space":1, 
        "road":2, 
        "available-parking":3, 
        "available-dropoff":3, 
        "car-awaiting-pickup":3, 
        "car-awaiting-owner":3, 
        "robot-location":3, 
    })

    function generateProblem() {

    }

    let pddlCells = [], i, j;
    for (i = 0; i < props.gridDimentions.columns; i++)
        for (j = 0; j < props.gridDimentions.rows; j++) {
            let uniqueId = j + props.gridDimentions.rows * i;

            let xCoord = props.parkingLotOffset.x + i * pddlGridCellSize.width;
            let yCoord = props.parkingLotOffset.y + j * pddlGridCellSize.height;

            let cellType;
            if (xCoord < props.parkingLotOffset.x + props.upperLeftSquareSide &&
                props.parkingLotOffset.y + yCoord < props.upperLeftSquareSide)
                cellType = props.stringColors.red;

            if (i === 5 && j === props.gridDimentions.rows - 2)
                cellType = props.stringColors.black;

            if (i === props.gridDimentions.columns - 4 && j === props.gridDimentions.rows - 1)
                cellType = props.stringColors.orange;

            if (i >= props.gridDimentions.columns - 3 && j === props.gridDimentions.rows - 1)
                cellType = props.stringColors.blue;

            if (i <= 2 && j >= 2)
                cellType = props.stringColors.green;

            pddlCells.push(
                <Rect
                    key={uniqueId}
                    x={xCoord}
                    y={yCoord}
                    width={pddlGridCellSize.width}
                    height={pddlGridCellSize.height}
                    fill={cellType}
                    shadowBlur={3}
                    stroke={"black"}
                    strokeWidth={0.5}
                />);
        }

    return (<>{pddlCells}</>);
}

export default PddlGrid;
