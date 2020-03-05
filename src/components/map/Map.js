import React from "react";
import { Group } from "react-konva";
import useImage from 'use-image';
import ParkingLotTile from "./tiles/ParkingLotTile";
import HubTile from "./tiles/HubTile";
import RoadTile from "./tiles/RoadTile";
import DebugTile from "./tiles/DebugTile";
import Robot from "./Robot";
const parkingURL = require('../../assets/images/parking-sign.png');
const hubURL = require('../../assets/images/hub.png');

function Map({ parkingLotConfiguration, gridCellSize, debugMode, parkingLotOffset, carImage, simulationOn, alreadyActivated, robotPath, removeCar, addCar, size, toggleSimulation, changeRobotGridStaticLocation, shiftPath, carriedCar, robotGridStaticLocation }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (
        <>
            <Group
                x={parkingLotOffset.x}
                y={parkingLotOffset.y}
            >
                {
                    parkingLotConfiguration.map((tileRow, rowIndex) => {
                        return tileRow.map((tile, colIndex) => {
                            let renderTile = null;

                            switch (tile.type) {
                                case "parking":
                                    renderTile = <ParkingLotTile
                                        key={rowIndex + colIndex + rowIndex * parkingLotConfiguration[0].length}
                                        row={rowIndex}
                                        col={colIndex}
                                        parkingLotConfiguration={parkingLotConfiguration}
                                        gridCellSize={gridCellSize}
                                        parkingImage={parkingImage}
                                        carImage={carImage}
                                    />
                                    break;
                                case "hub":
                                    renderTile = <HubTile
                                        key={rowIndex + colIndex + rowIndex * parkingLotConfiguration[0].length}
                                        row={rowIndex}
                                        col={colIndex}
                                        parkingLotConfiguration={parkingLotConfiguration}
                                        gridCellSize={gridCellSize}
                                        hubImage={hubImage}
                                        carImage={carImage}
                                    />
                                    break;
                                case "road":
                                    renderTile = <RoadTile
                                        key={rowIndex + colIndex + rowIndex * parkingLotConfiguration[0].length}
                                        row={rowIndex}
                                        col={colIndex}
                                        parkingLotConfiguration={parkingLotConfiguration}
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
                parkingLotOffset={parkingLotOffset}
                size={size}
                toggleSimulation={toggleSimulation}
                changeRobotGridStaticLocation={changeRobotGridStaticLocation}
            />

            {debugMode ?
                <Group
                    x={parkingLotOffset.x}
                    y={parkingLotOffset.y}>
                    {
                        parkingLotConfiguration.map((tileRow, rowIndex) => {
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
                                    key={rowIndex + colIndex + rowIndex * parkingLotConfiguration[0].length}
                                    tile={tile.type}
                                    row={rowIndex}
                                    col={colIndex}
                                    parkingLotConfiguration={parkingLotConfiguration}
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
