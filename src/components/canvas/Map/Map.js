import React from "react";
import PropTypes from 'prop-types';
import { Group } from "react-konva";
import parkingLotLayout from "../../../assets/initial-map.json";
import useImage from 'use-image';
import ParkingLotTile from "./ParkingLotTile.js";
import HubTile from "./HubTile.js";
import DebugTile from "./DebugTile.js";
const parkingURL = require('../../../assets/images/parking-sign.svg');
const hubURL = require('../../../assets/images/hub.svg');

function Map({ spacesAvailable, gridCellSize, offset, debugMode, carImage }) {
    const [parkingImage] = useImage(parkingURL);
    const [hubImage] = useImage(hubURL);

    return (parkingLotLayout.map((mapTile, index) => {
        let tile = null;
        let debugName = null;
        let hasStatus = false;

        switch (mapTile.type) {
            case "parking":
                tile = <ParkingLotTile
                    parkingLot={mapTile}
                    spacesAvailable={spacesAvailable}
                    gridCellSize={gridCellSize}
                    parkingImage={parkingImage}
                    carImage={carImage}
                />
                debugName = "Parking space";
                hasStatus = true;
                break;
            case "hub":
                tile = <HubTile
                    parkingLot={mapTile}
                    spacesAvailable={spacesAvailable}
                    gridCellSize={gridCellSize}
                    hubImage={hubImage}
                    carImage={carImage}
                />
                debugName = "Hub";
                hasStatus = true;
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
                {tile}
                {debugMode ?
                    <DebugTile
                        mapTile={mapTile}
                        spacesAvailable={spacesAvailable}
                        gridCellSize={gridCellSize}
                        debugName={debugName}
                        hasStatus={hasStatus}
                    />
                    :
                    null
                }
            </Group >
        );
    }));
}

Map.propTypes = {
    spacesAvailable: PropTypes.array.isRequired,
    gridCellSize: PropTypes.object.isRequired,
    debugMode: PropTypes.bool.isRequired,
    offset: PropTypes.object.isRequired
};

export default Map;
