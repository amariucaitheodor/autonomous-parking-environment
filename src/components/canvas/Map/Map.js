import React from "react";
import { Group } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./ParkingLotTile.js";
import HubTile from "./HubTile.js";
import DebugTile from "./DebugTile.js";
import Robot from "../Robot";
const parkingURL = require('../../../assets/images/parking-sign.svg');
const hubURL = require('../../../assets/images/hub.svg');

function Map({ parkingLotConfiguration, cars, gridCellSize, offset, debugMode, carImage, simulationOn, alreadyActivated, robotPath, removeCar, addCar, gridSize, parkingLotOffset, size, toggleSimulation, changeRobotGridStaticLocation, shiftPath, carriedCar, robotGridStaticLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (
        <>
            <Group
                x={offset.x}
                y={offset.y}
            >
                {
                    parkingLotConfiguration.map((tileRow, rowIndex) => {
                        return tileRow.map((tile, colIndex) => {
                            let renderTile = null;

                            switch (tile) {
                                case "parking":
                                    renderTile = <ParkingLotTile
                                        row={rowIndex}
                                        col={colIndex}
                                        cars={cars}
                                        gridCellSize={gridCellSize}
                                        parkingImage={parkingImage}
                                        carImage={carImage}
                                    />
                                    break;
                                case "hub":
                                    renderTile = <HubTile
                                        row={rowIndex}
                                        col={colIndex}
                                        cars={cars}
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
                parkingLotConfiguration={parkingLotConfiguration}
                shiftPath={shiftPath}
                carriedCar={carriedCar}
                robotGridStaticLocation={robotGridStaticLocation}
                gridCellSize={gridCellSize}
                carImage={carImage}
                simulationOn={simulationOn}
                alreadyActivated={alreadyActivated}
                robotPath={robotPath}
                removeCar={removeCar}
                addCar={addCar}
                gridSize={gridSize}
                parkingLotOffset={parkingLotOffset}
                size={size}
                toggleSimulation={toggleSimulation}
                changeRobotGridStaticLocation={changeRobotGridStaticLocation}
            />

            {debugMode ?
                <Group
                    x={offset.x}
                    y={offset.y}>
                    {
                        parkingLotConfiguration.map((tileRow, rowIndex) => {
                            return tileRow.map((tile, colIndex) => {
                                let debugName = null;

                                switch (tile) {
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
                                    tile={tile}
                                    row={rowIndex}
                                    col={colIndex}
                                    cars={cars}
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
