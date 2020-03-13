import React from "react";
import { Stage } from "react-konva";
import { makeStyles } from '@material-ui/core/styles';
import useImage from 'use-image';
import Map from './map/Map';
import indigo from '@material-ui/core/colors/indigo';
import { drawerWidth } from '../Configuration';
const carURL = require('../../assets/images/racecar.png');

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
        background: indigo,
    }
}));

function MonitorInterface({ size, simulatorInterface, changeCarStatusOnTile, changeTileType, configuration, carriedCar, debugMode, robotCommands, toggleSimulation, robotLocation, simulationOn, changeRobotGridLocation, liftCarFromTile, dropCarOnTile, alreadyActivated }) {
    const classes = useStyles();
    const [carImage] = useImage(carURL);

    if (size.monitorWidth / size.monitorHeight > 16 / 9)
        var horizontalPaddingInGridCells = 2; // widescreen
    else
        horizontalPaddingInGridCells = 1; // ~ square screen

    const gridCellSize = {
        height: size.monitorHeight / (configuration.length + 1), // vertical padding is always 1 grid cell high
        width: size.monitorWidth / (configuration[0].length + horizontalPaddingInGridCells)
    }

    const parkingLotOffset = {
        x: gridCellSize.width * horizontalPaddingInGridCells / 2, // divide padding into left and right padding
        y: gridCellSize.height / 2
    };

    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            <Stage
                width={size.monitorWidth}
                height={size.monitorHeight}
            >
                <Map
                    changeCarStatusOnTile={changeCarStatusOnTile}
                    changeTileType={changeTileType}
                    horizontalPaddingInGridCells={horizontalPaddingInGridCells}
                    simulatorInterface={simulatorInterface}
                    configuration={configuration}
                    carImage={carImage}
                    debugMode={debugMode}
                    gridCellSize={gridCellSize}
                    simulationOn={simulationOn}
                    alreadyActivated={alreadyActivated}
                    robotCommands={robotCommands}
                    liftCarFromTile={liftCarFromTile}
                    dropCarOnTile={dropCarOnTile}
                    parkingLotOffset={parkingLotOffset}
                    size={{ height: size.monitorHeight, width: size.monitorWidth }}
                    toggleSimulation={toggleSimulation}
                    changeRobotGridLocation={changeRobotGridLocation}
                    carriedCar={carriedCar}
                    robotLocation={robotLocation}
                />
            </Stage>
        </main>
    );
}

export default MonitorInterface;
