import React from "react";
import { FastLayer, Layer, Group, Rect } from "react-konva";
import DebugTile from "./tiles/DebugTile";
import { tileType, tileCarStatus } from '../../Configuration';
import GridImage from '../../../assets/monitor_icons_components/GridImage';
import ChangeTileTypeImage from '../../../assets/monitor_icons/switch.png';
import ChangeTileCarStatusImage from '../../../assets/monitor_icons/car-status.png';
import RequestCarImage from '../../../assets/monitor_icons/request-car.png';
import ArriveCarImage from '../../../assets/monitor_icons/enter-car.png';
import LeaveCarImage from '../../../assets/monitor_icons/exit-car.png';

function EditMap({ robotTargetSimulator, simulationButtonsDisabled, carRetrievedReplan, carRequestedReplan, carArrivedReplan, simulatorInterface, fromCanvasToGrid, changeTileType, changeCarStatusOnTile, configuration, gridCellSize, debugMode, visualGridOffset, simulationOn }) {

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
                                        visualGridOffset={visualGridOffset}
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
                    {simulatorInterface && !simulationButtonsDisabled ?
                        <Layer>
                            <Group
                                x={visualGridOffset.x}
                                y={visualGridOffset.y}>
                                {
                                    configuration.map((tileRow, rowIndex) => {
                                        return tileRow.map((tile, colIndex) => {
                                            var carEditable = tile.type === tileType.PARKING || tile.type === tileType.HUB;

                                            return (
                                                <React.Fragment key={rowIndex + colIndex + rowIndex * configuration[0].length}>
                                                    {carEditable ?
                                                        <>
                                                            <Rect
                                                                onClick={changeCarStatusClicked}
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
                                                        onClick={changeTileClicked}
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
                                                        src={simulationButtonsDisabled ? null : ChangeTileTypeImage}
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
                    {/* Interactable buttons to trigger mid-simulation events */}
                    {simulatorInterface && simulationOn ?
                        <Layer>
                            <Group
                                x={visualGridOffset.x}
                                y={visualGridOffset.y}>
                                {
                                    configuration.map((tileRow, rowIndex) => {
                                        return tileRow.map((tile, colIndex) => {
                                            var hasCarIdle = tile.car !== undefined &&
                                                tile.car.status === tileCarStatus.IDLE;
                                            var hasCarAwaitingOwner = tile.car !== undefined &&
                                                tile.car.status === tileCarStatus.AWAITING_OWNER;
                                            var isAvailableHub = tile.type === tileType.HUB &&
                                                tile.car === undefined;
                                            if (robotTargetSimulator)
                                                isAvailableHub = isAvailableHub && (robotTargetSimulator.col !== colIndex ||
                                                    robotTargetSimulator.row !== rowIndex);
                                            var replanPosition = { row: rowIndex, col: colIndex };

                                            if (hasCarIdle)
                                                var replanButtonImage = RequestCarImage;
                                            else if (hasCarAwaitingOwner) {
                                                replanButtonImage = LeaveCarImage;
                                            } else if (isAvailableHub)
                                                replanButtonImage = ArriveCarImage;

                                            return (
                                                <React.Fragment key={rowIndex + colIndex + rowIndex * configuration[0].length}>
                                                    {hasCarIdle || hasCarAwaitingOwner || isAvailableHub ?
                                                        <>
                                                            <Rect
                                                                onClick={() => {
                                                                    hasCarIdle ? carRequestedReplan(replanPosition) :
                                                                        (hasCarAwaitingOwner ? carRetrievedReplan(replanPosition) :
                                                                            carArrivedReplan(replanPosition))
                                                                }}
                                                                x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                                y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                                                width={gridCellSize.width / 4}
                                                                height={gridCellSize.height / 4}
                                                                fill={"rgba(239, 153, 16, 0.35)"}
                                                                stroke={"black"}
                                                                strokeWidth={2}
                                                            />
                                                            <GridImage
                                                                x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 3.9}
                                                                y={rowIndex * gridCellSize.height + gridCellSize.height / 3.65}
                                                                width={gridCellSize.width / 4}
                                                                height={gridCellSize.height / 5}
                                                                src={replanButtonImage}
                                                                listening={false}
                                                                shadowBlur={0}
                                                            />
                                                        </> :
                                                        null
                                                    }
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
