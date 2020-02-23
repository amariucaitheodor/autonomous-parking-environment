import React from "react";
import PropTypes from 'prop-types';
import { Rect, Image, Group } from "react-konva";
import useImage from 'use-image';
const trashURL = require('../assets/trash.svg');

function CarFactory({parkingLotOffset, size, gridCellSize, carImage, }) {
    const carFactoryOffset = { x: parkingLotOffset.x + size.width + gridCellSize.width / 3, y: parkingLotOffset.y };
    const [trashImage] = useImage(trashURL);
    
    // TODO:
    // const propCarToGrid = (carCanvasLocation) => {
    //     console.log(size.height);
    //     const cellColumn = Math.floor((carCanvasLocation.x - size.width / 5) / size.width * gridSize.columns); // size.width/5 should account for horizontal offset
    //     const cellRow = Math.floor((carCanvasLocation.y + 50) / size.height * gridSize.rows);

    //     if ((cellColumn >= 0 && cellColumn < gridSize.columns) && (cellRow >= 0 && cellRow < gridSize.rows)) {
    //         changeRobotGridStaticLocation(cellColumn, cellRow);
    //         var canvasLocation = fromGridToCanvas({ column: cellColumn, row: cellRow });
    //         shapeRef.current.to({
    //             x: canvasLocation.x,
    //             y: canvasLocation.y,
    //             duration: 0.1
    //         });
    //     }
    //     else {
    //         shapeRef.current.to({
    //             x: fromGridToCanvas(robotGridStaticLocation).x,
    //             y: fromGridToCanvas(robotGridStaticLocation).y,
    //             duration: 0.1
    //         });
    //     }
    // };

    return (
        <Group
            x={carFactoryOffset.x}
            y={carFactoryOffset.y}
        >
            <Rect
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={[0, "rgba(187,115,21)", 1, "rgba(225,140,30)"]}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Rect
                y={gridCellSize.height}
                width={gridCellSize.width}
                height={gridCellSize.height}
                fillRadialGradientStartPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientEndPoint={{ x: gridCellSize.width / 2, y: gridCellSize.height / 2 }}
                fillRadialGradientStartRadius={gridCellSize.width > gridCellSize.height ? gridCellSize.height : gridCellSize.width}
                fillRadialGradientColorStops={[0, "rgba(129,21,156)", 1, "rgba(185,31,224)"]}
                shadowBlur={5}
                stroke={"black"}
                strokeWidth={3}
            />
            <Image // trash can image
                y={gridCellSize.height * 1.25}
                width={gridCellSize.width}
                height={gridCellSize.height / 2}
                image={trashImage}
                shadowBlur={5}
            />
            <Image // standard car factory car image
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carImage}
                shadowBlur={5}
            />
            <Image // draggable car factory car image
                width={gridCellSize.width}
                height={gridCellSize.height}
                image={carImage}
                shadowBlur={5}
                draggable
                // TODO: onDragEnd={}
            />
        </Group>
        );
}

CarFactory.propTypes = {
    size: PropTypes.object.isRequired,
    parkingLotOffset: PropTypes.object.isRequired,
    gridCellSize: PropTypes.object.isRequired
};

export default CarFactory;
