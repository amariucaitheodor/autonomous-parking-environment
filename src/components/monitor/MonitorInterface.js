import React from "react";
import { Stage } from "react-konva";
import Map from './map/Map';
import indigo from '@material-ui/core/colors/indigo';
import { drawerWidth, MATERIAL_UI_APP_BAR_HEIGHT } from '../Configuration';

class MonitorInterface extends React.Component {
    calculateNewParameters() {
        let stageHeight = Math.max(window.innerHeight - MATERIAL_UI_APP_BAR_HEIGHT, 1);
        let stageWidth = Math.max(window.innerWidth - drawerWidth, 1);
        let horizontalPadding = (stageWidth / stageHeight > 16 / 9) ? 2 : 1;
        let gridCellSize = {
            height: stageHeight / (this.props.configuration.length + 1), // vertical padding is always 1 grid cell high
            width: stageWidth / (this.props.configuration[0].length + horizontalPadding)
        };
        let visualGridOffset = {
            x: gridCellSize.width * horizontalPadding / 2, // divide padding into left and right padding
            y: gridCellSize.height / 2
        };

        return {
            stageHeight: stageHeight,
            stageWidth: stageWidth,
            horizontalPadding: horizontalPadding,
            gridCellSize: gridCellSize,
            visualGridOffset: visualGridOffset,
        }
    }

    constructor(props) {
        super(props);

        let newParameters = this.calculateNewParameters();
        this.state = {
            stageHeight: newParameters.stageHeight,
            stageWidth: newParameters.stageWidth,
            horizontalPaddingInGridCells: newParameters.horizontalPadding,
            gridCellSize: newParameters.gridCellSize,
            parkingLotOffset: newParameters.visualGridOffset
        };
        this.checkForResize = this.checkForResize.bind(this);
    }

    checkForResize() {
        if (!this.props.resizableMonitor)
            return;

        let newParameters = this.calculateNewParameters();
        this.setState({
            stageHeight: newParameters.stageHeight,
            stageWidth: newParameters.stageWidth,
            horizontalPaddingInGridCells: newParameters.horizontalPadding,
            gridCellSize: newParameters.gridCellSize,
            parkingLotOffset: newParameters.visualGridOffset
        });
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkForResize);
    }

    componentDidUpdate(prevProps) {
        if (this.props.configuration !== prevProps.configuration)
            this.checkForResize();
    }

    render() {
        return (
            <main
                style={{ marginRight: drawerWidth, background: indigo }}
            >
                <div style={{ height: MATERIAL_UI_APP_BAR_HEIGHT }} />
                <Stage
                    width={this.state.stageWidth}
                    height={this.state.stageHeight}
                >
                    <Map
                        globalPlanView={this.props.globalPlanView}
                        changeCarStatusOnTile={this.props.changeCarStatusOnTile}
                        changeTileType={this.props.changeTileType}
                        simulatorInterface={this.props.simulatorInterface}
                        configuration={this.props.configuration}
                        debugMode={this.props.debugMode}
                        simulationOn={this.props.simulationOn}
                        alreadyActivated={this.props.alreadyActivated}
                        robotCommands={this.props.robotCommands}
                        liftCarFromTile={this.props.liftCarFromTile}
                        dropCarOnTile={this.props.dropCarOnTile}
                        toggleSimulation={this.props.toggleSimulation}
                        changeRobotGridLocation={this.props.changeRobotGridLocation}
                        carriedCar={this.props.carriedCar}
                        robotLocation={this.props.robotLocation}
                        // Managed by Monitor Interface
                        horizontalPaddingInGridCells={this.state.horizontalPaddingInGridCells}
                        size={{ height: this.state.stageHeight, width: this.state.stageWidth }}
                        parkingLotOffset={this.state.parkingLotOffset}
                        gridCellSize={this.state.gridCellSize}
                    />
                </Stage>
            </main>
        );
    }
}

export default MonitorInterface;
