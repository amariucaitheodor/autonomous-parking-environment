import React from "react";
import { FastLayer, Layer, Group, Rect } from "react-konva";
import DebugTile from "./tiles/DebugTile";
import { tileType } from '../../Configuration';
import GridImage from '../../../assets/monitor_icons_components/GridImage';
import ChangeTileTypeImage from '../../../assets/monitor_icons/switch.png';
import ChangeTileCarStatusImage from '../../../assets/monitor_icons/car-status.png';

function EditMap({ simulatorInterface, fromCanvasToGrid, changeTileType, changeCarStatusOnTile, configuration, gridCellSize, debugMode, parkingLotOffset, simulationOn }) {

    function changeTileClicked(e) {
        // Not entirely sure why this works
        var tilePosition = fromCanvasToGrid({
            x: e.target.attrs.x + gridCellSize.width / 2,
            y: e.target.attrs.y
        });

        changeTileType(tilePosition);
    }

    function changeCarStatusClicked(e) {
        // Not entirely sure why this works
        var tilePosition = fromCanvasToGrid({
            x: e.target.attrs.x + gridCellSize.width / 2,
            y: e.target.attrs.y
        });

        changeCarStatusOnTile(tilePosition);
    }

    return (
        <>
            {debugMode ?
                <>
                    {/* Actual debug tiles, non-interactable */}
                    <FastLayer>
                        {
                            configuration.map((tileRow, rowIndex) => {
                                return tileRow.map((tile, colIndex) => {
                                    let debugName = null;

                                    switch (tile.type) {
                                        case tileType.PARKING:
                                            debugName = "Parking space";
                                            break;
                                        case tileType.HUB:
                                            debugName = "Hub";
                                            break;
                                        case tileType.ROAD:
                                            debugName = "Road";
                                            break;
                                        case tileType.INACCESSIBLE:
                                            debugName = "Inaccessible";
                                            break;
                                        default:
                                            break;
                                    }

                                    return (<DebugTile
                                        parkingLotOffset={parkingLotOffset}
                                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                                        tile={tile}
                                        row={rowIndex}
                                        col={colIndex}
                                        gridCellSize={gridCellSize}
                                        debugName={debugName}
                                    />);
                                })
                            })}
                    </FastLayer>
                    {/* Interactable buttons to change the type or car status of tiles */}
                    {simulatorInterface && !simulationOn ?
                        <Layer>
                            <Group
                                x={parkingLotOffset.x}
                                y={parkingLotOffset.y}>
                                {
                                    configuration.map((tileRow, rowIndex) => {
                                        return tileRow.map((tile, colIndex) => {
                                            var carEditable = tile.type === tileType.PARKING || tile.type === tileType.HUB;

                                            return (
                                                <React.Fragment key={rowIndex + colIndex + rowIndex * configuration[0].length}>
                                                    {carEditable ?
                                                        <>
                                                            <Rect
                                                                onClick={simulationOn ? null : changeCarStatusClicked}
                                                                x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                                y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                                                width={gridCellSize.width / 4}
                                                                height={gridCellSize.height / 4}
                                                                fill={"rgba(239, 153, 16, 0.35)"}
                                                                stroke={"black"}
                                                                strokeWidth={2}
                                                            />
                                                            <GridImage
                                                                x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                                y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                                                width={gridCellSize.width / 4}
                                                                height={gridCellSize.height / 4}
                                                                src={ChangeTileCarStatusImage}
                                                                listening={false}
                                                                shadowBlur={0}
                                                            />
                                                        </> :
                                                        null
                                                    }
                                                    <Rect
                                                        onClick={simulationOn ? null : changeTileClicked}
                                                        x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                        y={rowIndex * gridCellSize.height}
                                                        width={gridCellSize.width / 4}
                                                        height={gridCellSize.height / 4}
                                                        fill={"rgba(239, 153, 16, 0.35)"}
                                                        stroke={"black"}
                                                        strokeWidth={2}
                                                    />
                                                    <GridImage
                                                        x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                        y={rowIndex * gridCellSize.height}
                                                        width={gridCellSize.width / 4}
                                                        height={gridCellSize.height / 4}
                                                        src={ChangeTileTypeImage}
                                                        listening={false}
                                                        shadowBlur={0}
                                                    />
                                                </React.Fragment>);
                                        })
                                    })}
                            </Group>
                        </Layer> :
                        null
                    }
                </> :
                null
            }
        </>
    );
}

export default EditMap;
