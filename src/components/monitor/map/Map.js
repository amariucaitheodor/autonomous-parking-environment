import React from "react";
import { Group } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./tiles/ParkingLotTile";
import HubTile from "./tiles/HubTile";
import RoadTile from "./tiles/RoadTile";
import DebugTile from "./tiles/DebugTile";
import Robot from "./Robot";
const parkingURL = require('../../../assets/images/parking-sign.png');
const hubURL = require('../../../assets/images/hub.png');

function Map({ simulatorInterface, configuration, gridCellSize, debugMode, parkingLotOffset, carImage, simulationOn, alreadyActivated, robotCommands, removeCar, addCar, size, toggleSimulation, changeRobotGridLocation, carriedCar, robotLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (
        <>
            <Group
                x={parkingLotOffset.x}
                y={parkingLotOffset.y}
            >
                {
                    configuration.map((tileRow, rowIndex) => {
                        return tileRow.map((tile, colIndex) => {
                            let renderTile = null;

                            switch (tile.type) {
                                case "parking":
                                    renderTile = <ParkingLotTile
                                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                                        row={rowIndex}
                                        col={colIndex}
                                        configuration={configuration}
                                        gridCellSize={gridCellSize}
                                        parkingImage={parkingImage}
                                        carImage={carImage}
                                    />
                                    break;
                                case "hub":
                                    renderTile = <HubTile
                                        key={rowIndex + colIndex + rowIndex * configuration[0].length}
                                        row={rowIndex}
                                        col={colIndex}
                                        configuration={configuration}
                                        gridCellSize={gridCellSize}
                                        hubImage={hubImage}
                                        carImage={carImage}
                                    />
                                    break;
                                case "road":
                                    renderTile = <RoadTile
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

                            return renderTile;
                        })
                    })
                }
            </Group>

            <Robot
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
                size={size}
                changeRobotGridLocation={changeRobotGridLocation}
                // Simulation specific actions
                simulationOn={simulationOn}
                toggleSimulation={toggleSimulation}
                alreadyActivated={alreadyActivated}
            />

            {debugMode ?
                <Group
                    x={parkingLotOffset.x}
                    y={parkingLotOffset.y}>
                    {
                        configuration.map((tileRow, rowIndex) => {
                            return tileRow.map((tile, colIndex) => {
                                let debugName = null;

                                switch (tile.type) {
                                    case "parking":
                                        debugName = "Parking space";
                                        break;
                                    case "hub":
                                        debugName = "Hub";
                                        break;
                                    case "road":
                                        debugName = "Road";
                                        break;
                                    case "blocked":
                                        debugName = "Blocked space";
                                        break;
                                    default:
                                        break;
                                }

                                return (<DebugTile
                                    key={rowIndex + colIndex + rowIndex * configuration[0].length}
                                    tile={tile.type}
                                    row={rowIndex}
                                    col={colIndex}
                                    configuration={configuration}
                                    gridCellSize={gridCellSize}
                                    debugName={debugName}
                                />)
                            })
                        })
                    }
                </Group >
                :
                null
            }
        </>
    );
}

export default Map;
