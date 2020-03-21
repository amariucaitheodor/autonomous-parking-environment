import React from "react";
import { Stage } from "react-konva";
import Map from './map/Map';
import EditMap from './map/EditMap';
import Robot from './map/Robot';
import LinearProgress from '@material-ui/core/LinearProgress';
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
            visualGridOffset: newParameters.visualGridOffset
        };
        this.checkForResize = this.checkForResize.bind(this);
        this.fromGridToCanvas = this.fromGridToCanvas.bind(this);
        this.fromCanvasToGrid = this.fromCanvasToGrid.bind(this);
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
            visualGridOffset: newParameters.visualGridOffset
        });
    }

    componentDidMount() {
        window.addEventListener("resize", this.checkForResize);
    }

    componentDidUpdate(prevProps) {
        if (this.props.configuration !== prevProps.configuration)
            this.checkForResize();
    }

    fromGridToCanvas(position) {
        return {
            x: this.state.visualGridOffset.x + position.column * this.state.gridCellSize.width,
            y: this.state.visualGridOffset.y + position.row * this.state.gridCellSize.height - this.state.gridCellSize.height / 50
        };
    }

    fromCanvasToGrid(position) {
        // The upper left of tile (0, 0) is (- gridCellSize.width / 2, - gridCellSize.height / 2)
        // visualGridOffset is:
        // (gridCellSize.width / 2, gridCellSize.height / 2) when horizontalPaddingInGridCells is 1
        // (gridCellSize.width, gridCellSize.height / 2) when horizontalPaddingInGridCells is 2
        var cellColumn = Math.floor(
            (position.x
                + this.state.gridCellSize.width / 2
                - this.state.gridCellSize.width / 2 * this.state.horizontalPaddingInGridCells
            )
            / this.state.stageWidth
            * (this.props.configuration[0].length + this.state.horizontalPaddingInGridCells) // horizontal padding cells are variable (1 or 2)
        );
        var cellRow = Math.floor(
            position.y
            / this.state.stageHeight
            * (this.props.configuration.length + 1) // vertical padding cells are always 1 height tall in total
        );

        return { row: cellRow, column: cellColumn };
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
                        configuration={this.props.configuration}
                        gridCellSize={this.state.gridCellSize}
                        parkingLotOffset={this.state.visualGridOffset}
                    />
                    <Robot
                        changeRobotIsCarrying={this.props.changeRobotIsCarrying}
                        fromCanvasToGrid={this.fromCanvasToGrid}
                        fromGridToCanvas={this.fromGridToCanvas}
                        globalPlanView={this.props.globalPlanView}
                        parkingLotOffset={this.state.visualGridOffset}
                        simulatorInterface={this.props.simulatorInterface}
                        configuration={this.props.configuration}
                        robotLocation={this.props.robotLocation}
                        carriedCar={this.props.carriedCar}
                        gridCellSize={this.state.gridCellSize}
                        simulationOn={this.props.simulationOn}
                        alreadyActivated={this.props.alreadyActivated}
                        robotCommands={this.props.robotCommands}
                        liftCarFromTile={this.props.liftCarFromTile}
                        dropCarOnTile={this.props.dropCarOnTile}
                        toggleSimulation={this.props.toggleSimulation}
                        changeRobotGridLocation={this.props.changeRobotGridLocation}
                    />
                    <EditMap
                        fromCanvasToGrid={this.fromCanvasToGrid}
                        parkingLotOffset={this.state.visualGridOffset}
                        simulatorInterface={this.props.simulatorInterface}
                        configuration={this.props.configuration}
                        gridCellSize={this.state.gridCellSize}
                        changeTileType={this.props.changeTileType}
                        changeCarStatusOnTile={this.props.changeCarStatusOnTile}
                        debugMode={this.props.debugMode}
                        simulationOn={this.props.simulationOn}
                    />
                </Stage>
                {
                    this.props.showLoader ?
                        <LinearProgress style={{ position: "fixed", left: 0, right: 0, bottom: 0 }} variant="query" />
                        :
                        null
                }
            </main>
        );
    }
}

export default MonitorInterface;
