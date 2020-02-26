import React from "react";
import { Group } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./ParkingLotTile.js";
import HubTile from "./HubTile.js";
import DebugTile from "./DebugTile.js";
import Robot from "../Robot";
const parkingURL = require('../../../assets/images/parking-sign.svg');
const hubURL = require('../../../assets/images/hub.svg');

function Map({ map, cars, gridCellSize, offset, debugMode, carImage, simulationOn, alreadyActivated, robotPath, removeCar, addCar, gridSize, parkingLotOffset, size, toggleSimulation, changeRobotGridStaticLocation, shiftPath, carriedCar, robotGridStaticLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (
        <>
            {
                map.map((mapTile, index) => {
                    let tile = null;

                    switch (mapTile.type) {
                        case "parking":
                            tile = <ParkingLotTile
                                mapTile={mapTile}
                                cars={cars}
                                gridCellSize={gridCellSize}
                                parkingImage={parkingImage}
                                carImage={carImage}
                            />
                            break;
                        case "hub":
                            tile = <HubTile
                                mapTile={mapTile}
                                cars={cars}
                                gridCellSize={gridCellSize}
                                hubImage={hubImage}
                                carImage={carImage}
                            />
                            break;
                        default:
                            break;
                    }

                    return (
                        <Group
                            key={index}
                            x={offset.x}
                            y={offset.y}>
                            {tile}
                        </Group >
                    )
                })
            }

            <Robot
                map={map}
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
                map.map((mapTile, index) => {
                    let debugName = null;

                    switch (mapTile.type) {
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

                    return (
                        <Group
                            key={index}
                            x={offset.x}
                            y={offset.y}>
                            <DebugTile
                                mapTile={mapTile}
                                cars={cars}
                                gridCellSize={gridCellSize}
                                debugName={debugName}
                            />
                        </Group >
                    )
                })
                :
                null
            }
        </>
    );
}

export default Map;
