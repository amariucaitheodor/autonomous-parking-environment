import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { makeStyles } from '@material-ui/core/styles';
import useImage from 'use-image';
import Map from './map/Map';
import indigo from '@material-ui/core/colors/indigo';
const carURL = require('../assets/images/racecar.png');

const drawerWidth = 315;

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    content: {
        marginRight: drawerWidth,
        background: indigo,
    }
}));

function Canvas({
    parkingLotConfiguration,
    carriedCar,
    debugMode,
    robotPath,
    toggleSimulation,
    robotGridStaticLocation,
    simulationOn,
    changeRobotGridStaticLocation,
    removeCar,
    addCar,
    alreadyActivated,
    resizable,
    shiftPath
}) {
    const MATERIAL_UI_APP_BAR_HEIGHT = 64;
    const classes = useStyles();
    const [carImage] = useImage(carURL);
    const [stageHeight, setStageHeight] = useState(window.innerHeight - MATERIAL_UI_APP_BAR_HEIGHT);
    const [stageWidth, setStageWidth] = useState(window.innerWidth - drawerWidth);
    const size = { height: stageHeight, width: stageWidth };
    const gridCellSize = {
        // +1 for padding (1/2 of normal block is the size of the padding block)
        height: size.height / (parkingLotConfiguration.length + 1),
        width: size.width / (parkingLotConfiguration[0].length + 1)
    }
    const parkingLotOffset = { x: gridCellSize.width / 2, y: gridCellSize.height / 2 };

    useEffect(() => {
        function checkSize() {
            if (window.innerHeight > MATERIAL_UI_APP_BAR_HEIGHT)
                setStageHeight(window.innerHeight - MATERIAL_UI_APP_BAR_HEIGHT);
            if (window.innerWidth > drawerWidth)
                setStageWidth(window.innerWidth - drawerWidth);
        }

        if (resizable) {
            checkSize();
            window.addEventListener("resize", checkSize);
        }
    }, [resizable]);


    return (
        <main
            className={classes.content}
        >
            <div className={classes.toolbar} />
            <Stage
                width={size.width}
                height={size.height}
            >
                <Layer>
                    <Map
                        parkingLotConfiguration={parkingLotConfiguration}
                        carImage={carImage}
                        debugMode={debugMode}
                        gridCellSize={gridCellSize}
                        simulationOn={simulationOn}
                        alreadyActivated={alreadyActivated}
                        robotPath={robotPath}
                        removeCar={removeCar}
                        addCar={addCar}
                        parkingLotOffset={parkingLotOffset}
                        size={size}
                        toggleSimulation={toggleSimulation}
                        changeRobotGridStaticLocation={changeRobotGridStaticLocation}
                        shiftPath={shiftPath}
                        carriedCar={carriedCar}
                        robotGridStaticLocation={robotGridStaticLocation}
                    />
                </Layer>
            </Stage>
        </main>
    );
}

export default Canvas;
