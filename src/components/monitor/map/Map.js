import React from "react";
import { FastLayer, Layer, Group, Rect, Image } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./tiles/ParkingLotTile";
import HubTile from "./tiles/HubTile";
import RoadTile from "./tiles/RoadTile";
import DebugTile from "./tiles/DebugTile";
import InaccessibleTile from './tiles/InaccessibleTile';
import Robot from "./Robot";
import { tileType } from '../../Configuration';
const parkingURL = require('../../../assets/monitor_icons/parking-sign.png');
const blockedURL = require('../../../assets/monitor_icons/blocked-sign.png');
const switchURL = require('../../../assets/monitor_icons/switch.png');
const carStatusURL = require('../../../assets/monitor_icons/car-status.png');
const hubURL = require('../../../assets/monitor_icons/hub.png');
const carURL = require('../../../assets/monitor_icons/racecar.png');

function Map({ simulatorInterface, globalPlanView, horizontalPaddingInGridCells, changeTileType, changeCarStatusOnTile, configuration, gridCellSize, debugMode, parkingLotOffset, simulationOn, alreadyActivated, robotCommands, liftCarFromTile, dropCarOnTile, size, toggleSimulation, changeRobotGridLocation, carriedCar, robotLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [blockedImage] = useImage(blockedURL);
    const [hubImage] = useImage(hubURL);
    const [switchImage] = useImage(switchURL);
    const [carStatusImage] = useImage(carStatusURL);
    const [carImage] = useImage(carURL);
    console.log("Refreshing Map")

    function fromCanvasToGrid(position) {
        // The upper left of tile (0, 0) is (- gridCellSize.width / 2, - gridCellSize.height / 2)
        // parkingLotOffset is:
        // (gridCellSize.width / 2, gridCellSize.height / 2) when horizontalPaddingInGridCells is 1
        // (gridCellSize.width, gridCellSize.height / 2) when horizontalPaddingInGridCells is 2
        var cellColumn = Math.floor(
            (position.x
                + gridCellSize.width / 2
                - gridCellSize.width / 2 * horizontalPaddingInGridCells
            )
            / size.width
            * (configuration[0].length + horizontalPaddingInGridCells) // horizontal padding cells are variable (1 or 2)
        );
        var cellRow = Math.floor(
            position.y
            / size.height
            * (configuration.length + 1) // vertical padding cells are always 1 height tall in total
        );

        return { row: cellRow, column: cellColumn };
    }

    function fromGridToCanvas(position) {
        return {
            x: parkingLotOffset.x + position.column * gridCellSize.width,
            y: parkingLotOffset.y + position.row * gridCellSize.height - gridCellSize.height / 50
        };
    }

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
                        parkingImage={parkingImage}
                        carImage={carImage}
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
                        hubImage={hubImage}
                        carImage={carImage}
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
                        hubImage={hubImage}
                        carImage={carImage}
                    />
                    break;
                case tileType.INACCESSIBLE:
                    renderTile = <InaccessibleTile
                        parkingLotOffset={parkingLotOffset}
                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                        row={rowIndex}
                        col={colIndex}
                        gridCellSize={gridCellSize}
                        blockedImage={blockedImage}
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
        <>
            <FastLayer>
                {tiles}
            </FastLayer>
            <Layer>
                <Robot
                    fromCanvasToGrid={fromCanvasToGrid}
                    fromGridToCanvas={fromGridToCanvas}
                    simulatorInterface={simulatorInterface}
                    configuration={configuration}
                    carriedCar={carriedCar}
                    robotLocation={robotLocation}
                    gridCellSize={gridCellSize}
                    carImage={carImage}
                    robotCommands={robotCommands}
                    liftCarFromTile={liftCarFromTile}
                    dropCarOnTile={dropCarOnTile}
                    parkingLotOffset={parkingLotOffset}
                    changeRobotGridLocation={changeRobotGridLocation}
                    // Simulation specific actions
                    simulationOn={simulationOn}
                    toggleSimulation={toggleSimulation}
                    alreadyActivated={alreadyActivated}
                    globalPlanView={globalPlanView}
                />
            </Layer>
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
                                                            <Image
                                                                x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                                y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                                                width={gridCellSize.width / 4}
                                                                height={gridCellSize.height / 4}
                                                                image={carStatusImage}
                                                                listening={false}
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
                                                    <Image
                                                        x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                        y={rowIndex * gridCellSize.height}
                                                        width={gridCellSize.width / 4}
                                                        height={gridCellSize.height / 4}
                                                        image={switchImage}
                                                        listening={false}
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

export default Map;
