import React from "react";
import { FastLayer } from "react-konva";
import ParkingLotTile from "./tiles/ParkingLotTile";
import HubTile from "./tiles/HubTile";
import RoadTile from "./tiles/RoadTile";
import InaccessibleTile from './tiles/InaccessibleTile';
import { tileType } from '../../Configuration';

function Map({ configuration, gridCellSize, parkingLotOffset }) {
    console.log("Refreshing Map")

    let tiles = [];
    configuration.forEach((tileRow, rowIndex) => {
        tileRow.forEach((tile, colIndex) => {
            let renderTile = null;

            // We pass parkingLotOffset to the tiles to eliminate nesting and thus be able to run in FastLayer
            switch (tile.type) {
                case tileType.PARKING:
                    renderTile = <ParkingLotTile
                        parkingLotOffset={parkingLotOffset}
                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                        row={rowIndex}
                        col={colIndex}
                        configuration={configuration}
                        gridCellSize={gridCellSize}
                    />
                    break;
                case tileType.HUB:
                    renderTile = <HubTile
                        parkingLotOffset={parkingLotOffset}
                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                        row={rowIndex}
                        col={colIndex}
                        configuration={configuration}
                        gridCellSize={gridCellSize}
                    />
                    break;
                case tileType.ROAD:
                    renderTile = <RoadTile
                        parkingLotOffset={parkingLotOffset}
                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                        row={rowIndex}
                        col={colIndex}
                        configuration={configuration}
                        gridCellSize={gridCellSize}
                    />
                    break;
                case tileType.INACCESSIBLE:
                    renderTile = <InaccessibleTile
                        parkingLotOffset={parkingLotOffset}
                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                        row={rowIndex}
                        col={colIndex}
                        gridCellSize={gridCellSize}
                    />
                    break;
                default:
                    break;
            }

            if (tile.type === tileType.ROAD)
                tiles.unshift(renderTile); // road tiles should be rendered first to bring them to the bottom
            else
                tiles.push(renderTile);
        })
    });

    return (
        <FastLayer>
            {tiles}
        </FastLayer>
    );
}

export default Map;
