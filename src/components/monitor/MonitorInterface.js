import React from "react";
import { Stage, Layer } from "react-konva";
import { makeStyles } from '@material-ui/core/styles';
import useImage from 'use-image';
import Map from './map/Map';
import indigo from '@material-ui/core/colors/indigo';
const carURL = require('../../assets/images/racecar.png');

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
        background: indigo,
    }
}));

function MonitorInterface({ size, simulatorInterface, configuration, carriedCar, debugMode, robotCommands, toggleSimulation, robotLocation, simulationOn, changeRobotGridLocation, removeCar, addCar, alreadyActivated}) {
    const classes = useStyles();
    const [carImage] = useImage(carURL);
    const gridCellSize = {
        // +1 for padding (1/2 of normal block is the size of the padding block)
        height: size.monitorHeight / (configuration.length + 1),
        width: size.monitorWidth / (configuration[0].length + 1)
    }
    const parkingLotOffset = { x: gridCellSize.width / 2, y: gridCellSize.height / 2 };

    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            <Stage
                width={size.monitorWidth}
                height={size.monitorHeight}
            >
                <Layer>
                    <Map
                        simulatorInterface={simulatorInterface}
                        configuration={configuration}
                        carImage={carImage}
                        debugMode={debugMode}
                        gridCellSize={gridCellSize}
                        simulationOn={simulationOn}
                        alreadyActivated={alreadyActivated}
                        robotCommands={robotCommands}
                        removeCar={removeCar}
                        addCar={addCar}
                        parkingLotOffset={parkingLotOffset}
                        size={{ height: size.monitorHeight, width: size.monitorWidth }}
                        toggleSimulation={toggleSimulation}
                        changeRobotGridLocation={changeRobotGridLocation}
                        carriedCar={carriedCar}
                        robotLocation={robotLocation}
                    />
                </Layer>
            </Stage>
        </main>
    );
}

export default MonitorInterface;
