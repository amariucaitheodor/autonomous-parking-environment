import React from "react";
import { FastLayer, Layer, Group, Rect } from "react-konva";
import DebugTile from "./tiles/DebugTile";
import { tileType, tileCarStatus } from '../../Configuration';
import KonvaImage from '../../KonvaImage';
import ChangeTileTypeImage from '../../../assets/monitor_icons/switch.png';
import ChangeTileCarStatusImage from '../../../assets/monitor_icons/car-status.png';
import RequestCarImage from '../../../assets/monitor_icons/request-car.png';
import ArriveCarImage from '../../../assets/monitor_icons/enter-car.png';
import LeaveCarImage from '../../../assets/monitor_icons/exit-car.png';

function EditMap({ robotTargetSimulator, simulationAboutToStartOrStarted, carRetrievedReplan, carRequestedReplan, carArrivedReplan, simulatorInterface, fromCanvasToGrid, changeTileType, changeCarStatusOnTile, configuration, gridCellSize, debugMode, visualGridOffset, simulationOn }) {

    function changeTileClicked(e) {
        // Not entirely sure why this works
        var tilePosition = fromCanvasToGrid({
            x: e.target.parent.attrs.x + gridCellSize.width / 2,
            y: e.target.parent.attrs.y
        });

        changeTileType(tilePosition);
    }

    function changeCarStatusClicked(e) {
        // Not entirely sure why this works
        var tilePosition = fromCanvasToGrid({
            x: e.target.parent.attrs.x + gridCellSize.width / 2,
            y: e.target.parent.attrs.y
        });

        changeCarStatusOnTile(tilePosition);
    }

    return (
        <>
            {/* Actual debug tiles, non-interactable */}
            <FastLayer
                visible={debugMode}>
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
            <Layer
                visible={debugMode && simulatorInterface && !simulationAboutToStartOrStarted}>
                <Group
                    x={visualGridOffset.x}
                    y={visualGridOffset.y}>
                    {
                        configuration.map((tileRow, rowIndex) => {
                            return tileRow.map((tile, colIndex) => {
                                var carEditable = tile.type === tileType.PARKING || tile.type === tileType.HUB;

                                return (
                                    <React.Fragment key={rowIndex + colIndex + rowIndex * configuration[0].length}>
                                        <Group
                                            x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                            y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                            visible={carEditable}>
                                            <Rect
                                                onClick={changeCarStatusClicked}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 4}
                                                fill={"rgba(239, 153, 16, 0.35)"}
                                                stroke={"black"}
                                                strokeWidth={2}
                                            />
                                            <KonvaImage
                                                x={0}
                                                y={0}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 4}
                                                src={ChangeTileCarStatusImage}
                                                listening={false}
                                                shadowBlur={0}
                                            />
                                        </Group>
                                        <Group
                                            x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                            y={rowIndex * gridCellSize.height}>
                                            <Rect
                                                onClick={changeTileClicked}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 4}
                                                fill={"rgba(239, 153, 16, 0.35)"}
                                                stroke={"black"}
                                                strokeWidth={2}
                                            />
                                            <KonvaImage
                                                x={0}
                                                y={0}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 4}
                                                // simulationAboutToStartOrStarted check here will fix technical errors
                                                src={ChangeTileTypeImage}
                                                listening={false}
                                                shadowBlur={0}
                                            />
                                        </Group>
                                    </React.Fragment>);
                            })
                        })}
                </Group>
            </Layer>
            {/* Interactable buttons to trigger mid-simulation events */}
            <Layer
                visible={debugMode && simulatorInterface && simulationOn}>
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

                                return (
                                    <React.Fragment key={rowIndex + colIndex + rowIndex * configuration[0].length}>
                                        <Group
                                            x={(colIndex + 1) * gridCellSize.width}
                                            y={rowIndex * gridCellSize.height}
                                            visible={hasCarIdle || hasCarAwaitingOwner || isAvailableHub}>
                                            <Rect
                                                onClick={() => {
                                                    hasCarIdle ? carRequestedReplan(replanPosition) :
                                                        (hasCarAwaitingOwner ? carRetrievedReplan(replanPosition) :
                                                            carArrivedReplan(replanPosition))
                                                }}
                                                x={- gridCellSize.width / 4}
                                                y={+ gridCellSize.height / 4}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 4}
                                                fill={"rgba(239, 153, 16, 0.35)"}
                                                stroke={"black"}
                                                strokeWidth={2}
                                            />
                                            <KonvaImage
                                                x={- gridCellSize.width / 3.9}
                                                y={+ gridCellSize.height / 3.65}
                                                width={gridCellSize.width / 4}
                                                height={gridCellSize.height / 5}
                                                src={hasCarIdle ? RequestCarImage :
                                                    (hasCarAwaitingOwner ? LeaveCarImage :
                                                        ArriveCarImage)}
                                                listening={false}
                                                shadowBlur={0}
                                            />
                                        </Group>
                                    </React.Fragment>);
                            })
                        })}
                </Group>
            </Layer>
        </>
    );
}

export default EditMap;
