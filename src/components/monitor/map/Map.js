import React from "react";
import { FastLayer, Layer, Group, Rect } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./tiles/ParkingLotTile";
import HubTile from "./tiles/HubTile";
import RoadTile from "./tiles/RoadTile";
import DebugTile from "./tiles/DebugTile";
import Robot from "./Robot";
import { tileType } from '../../Configuration';
const parkingURL = require('../../../assets/images/parking-sign.png');
const hubURL = require('../../../assets/images/hub.png');

function Map({ simulatorInterface, horizontalPaddingInGridCells, changeTileType, configuration, gridCellSize, debugMode, parkingLotOffset, carImage, simulationOn, alreadyActivated, robotCommands, removeCar, addCar, size, toggleSimulation, changeRobotGridLocation, carriedCar, robotLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

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
        console.log(e.target.attrs);

        // Not entirely sure why this works
        var tilePosition = fromCanvasToGrid({
            x: e.target.attrs.x + gridCellSize.width / 2,
            y: e.target.attrs.y
        });

        changeTileType(tilePosition);
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
                    removeCar={removeCar}
                    addCar={addCar}
                    parkingLotOffset={parkingLotOffset}
                    changeRobotGridLocation={changeRobotGridLocation}
                    // Simulation specific actions
                    simulationOn={simulationOn}
                    toggleSimulation={toggleSimulation}
                    alreadyActivated={alreadyActivated}
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
                                        case tileType.BLOCKED:
                                            debugName = "Blocked space";
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
                                        configuration={configuration}
                                        gridCellSize={gridCellSize}
                                        debugName={debugName}
                                    />);
                                })
                            })}
                    </FastLayer>
                    {/* Interactable buttons to change the type or car status of tiles */}
                    {simulatorInterface ?
                        <Layer>
                            {
                                configuration.map((tileRow, rowIndex) => {
                                    return tileRow.map((tile, colIndex) => {
                                        var carEditable = tile.type === tileType.PARKING || tile.type === tileType.HUB;

                                        return (<Group
                                            x={parkingLotOffset.x}
                                            y={parkingLotOffset.y}>
                                            {carEditable ?
                                                <Rect
                                                    x={(colIndex + 1) * gridCellSize.width - gridCellSize.width / 4}
                                                    y={rowIndex * gridCellSize.height + gridCellSize.height / 4}
                                                    width={gridCellSize.width / 4}
                                                    height={gridCellSize.height / 4}
                                                    fill={"rgba(239, 153, 16, 0.35)"}
                                                    stroke={"black"}
                                                    strokeWidth={2}
                                                /> :
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
                                        </Group>);
                                    })
                                })}
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
