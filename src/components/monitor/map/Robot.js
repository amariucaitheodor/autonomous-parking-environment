import React, { createRef } from "react";
import { Image, Arrow, Layer } from "react-konva";
import RobotImage from '../../../assets/monitor_icons/robot.png';
import CarImage from '../../../assets/monitor_icons/racecar.png';
import Konva from "konva";

class Robot extends React.Component {
    constructor() {
        super()
        this.simulatorRobotImageRef = createRef();
        this.parkingRobotImageRef = createRef();

        this.state = {
            activePath: [],
            globalPath: [],
            localPaths: []
        }
    }

    componentDidMount() {
        const carImage = new window.Image();
        carImage.src = CarImage;
        carImage.onload = () => {
            this.setState({
                carImage: carImage
            });
        };
        const robotImage = new window.Image();
        robotImage.src = RobotImage;
        robotImage.onload = () => {
            this.setState({
                robotImage: robotImage
            });
        };

        this.updatePaths = this.updatePaths.bind(this);
        this.executeSimulation = this.executeSimulation.bind(this);
    }

    setScale = (x, y) => {
        this.simulatorRobotImageRef.current.to({
            scaleX: x,
            scaleY: y,
            duration: 0.1
        });
    };

    propToGrid = (robotCanvasLocation, { robotLeavingHubAsCarEnters }) => {
        var robotGridLocation = this.props.fromCanvasToGrid(robotCanvasLocation);

        if ((robotGridLocation.col >= 0 && robotGridLocation.col < this.props.configuration[0].length) &&
            (robotGridLocation.row >= 0 && robotGridLocation.row < this.props.configuration.length) &&
            (this.props.configuration[robotGridLocation.row][robotGridLocation.col].car === null ||
                this.props.configuration[robotGridLocation.row][robotGridLocation.col].car === undefined ||
                this.props.carriedCar === null ||
                robotLeavingHubAsCarEnters === true)) {
            this.props.changeRobotGridLocation({ col: robotGridLocation.col, row: robotGridLocation.row });
            var canvasLocation = this.props.fromGridToCanvas({ col: robotGridLocation.col, row: robotGridLocation.row });
        } else {
            canvasLocation = this.props.cavasRobotLocation;
        }

        this.simulatorRobotImageRef.current.to({
            x: canvasLocation.x,
            y: canvasLocation.y,
            duration: 0.1
        });
    };

    updatePaths = () => {
        let newGlobalPath = [];
        for (var i = 0; i < this.props.robotCommands.length; i++) {
            let xCoord = this.props.visualGridOffset.x + this.props.robotCommands[i].col * this.props.gridCellSize.width + this.props.gridCellSize.width / 2;
            let yCoord = this.props.visualGridOffset.y + this.props.robotCommands[i].row * this.props.gridCellSize.height + this.props.gridCellSize.height / 2;
            newGlobalPath.push(xCoord);
            newGlobalPath.push(yCoord);
        }

        let localPathsArray = [];
        let newPathStop = [];
        for (i = 0; i < this.props.robotCommands.length; i++) {
            let xCoord = this.props.visualGridOffset.x + this.props.robotCommands[i].col * this.props.gridCellSize.width + this.props.gridCellSize.width / 2;
            let yCoord = this.props.visualGridOffset.y + this.props.robotCommands[i].row * this.props.gridCellSize.height + this.props.gridCellSize.height / 2;
            newPathStop.push(xCoord);
            newPathStop.push(yCoord);
            if (this.props.robotCommands[i].pickupCar || this.props.robotCommands[i].dropCar) {
                localPathsArray.push(newPathStop);
                newPathStop = [];
                let xCoord = this.props.visualGridOffset.x + this.props.robotCommands[i].col * this.props.gridCellSize.width + this.props.gridCellSize.width / 2;
                let yCoord = this.props.visualGridOffset.y + this.props.robotCommands[i].row * this.props.gridCellSize.height + this.props.gridCellSize.height / 2;
                newPathStop.push(xCoord);
                newPathStop.push(yCoord);
            }
        }

        var currentLocalPath = localPathsArray[this.props.simulatorLocalPathsProgress];
        this.setState({
            localPaths: localPathsArray,
            globalPath: newGlobalPath,
            activePath: this.props.globalPlanView ? newGlobalPath : currentLocalPath
        });
        var targetGridLocation = this.props.fromCanvasToGrid({ x: currentLocalPath[currentLocalPath.length - 2], y: currentLocalPath[currentLocalPath.length - 1] });
        this.props.changeRobotTarget(targetGridLocation);
    }

    simulationTimer = null;
    executeSimulation(index, givenCommmands) {
        if (givenCommmands[index - 1].pickupCar !== undefined)
            this.props.liftCarFromTile({
                row: givenCommmands[index - 1].row,
                col: givenCommmands[index - 1].col
            },
                this.props.simulatorInterface
            );
        else if (givenCommmands[index - 1].dropCar !== undefined)
            this.props.dropCarOnTile({
                row: givenCommmands[index - 1].row,
                col: givenCommmands[index - 1].col
            },
                this.props.simulatorInterface
            );

        if (index !== givenCommmands.length) {
            this.simulatorRobotImageRef.current.to({
                x: this.props.fromGridToCanvas(givenCommmands[index]).x,
                y: this.props.fromGridToCanvas(givenCommmands[index]).y,
                easing: Konva.Easings.EaseInOut,
                duration: 1
            });
        }

        index += 1;
        if (index > givenCommmands.length || !this.props.simulationOn) {
            this.props.toggleSimulation("Executed plan, entering standby");
            return;
        }
        this.simulationTimer = setTimeout(this.executeSimulation.bind({}, index, givenCommmands), 1050);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.simulatorInterface === false) {
            return;
        } else if (this.props.simulatorInterface === false) {
            // Default to no paths for the parking lot interface as this feature (parking lot interface) was cancelled by team.
            this.setState({
                localPaths: [],
                globalPath: [],
                activePath: []
            });
            return;
        }

        if (prevProps.simulationOn !== this.props.simulationOn) {
            if (this.props.simulationOn) {
                this.updatePaths();
                this.executeSimulation(1, this.props.robotCommands);
            } else {
                clearTimeout(this.simulationTimer);
                this.setState({
                    localPaths: [],
                    globalPath: [],
                    activePath: []
                });
                // Only when simulation is stopped because of a replan, a robot might be 
                // leaving a hub with a car as another car enters, thus allow robot carrying
                // car to be propped to a grid cell already containing a car.
                this.propToGrid({
                    x: this.simulatorRobotImageRef.current.attrs.x,
                    y: this.simulatorRobotImageRef.current.attrs.y
                }, { robotLeavingHubAsCarEnters: true });
            }
        } else if (this.props.simulationOn && this.props.simulatorLocalPathsProgress !== this.state.localPaths.length) {
            if (prevProps.gridCellSize !== this.props.gridCellSize) {
                this.updatePaths();
            }

            if (prevProps.simulatorLocalPathsProgress !== this.props.simulatorLocalPathsProgress && !this.props.globalPlanView) {
                var currentLocalPath = this.state.localPaths[this.props.simulatorLocalPathsProgress];
                this.setState({
                    activePath: currentLocalPath
                });
                var targetGridLocation = this.props.fromCanvasToGrid({ x: currentLocalPath[currentLocalPath.length - 2], y: currentLocalPath[currentLocalPath.length - 1] });
                this.props.changeRobotTarget(targetGridLocation);
            }

            if (prevProps.globalPlanView !== this.props.globalPlanView) {
                this.setState({
                    activePath: this.props.globalPlanView ? this.state.globalPath : this.state.localPaths[this.props.simulatorLocalPathsProgress]
                });
            }
        }
    }

    render() {
        return (
            <Layer>
                {/* Robot path */}
                < Arrow
                    points={this.state.activePath}
                    shadowBlur={0.5}
                    stroke={"black"}
                    strokeWidth={0.7}
                />
                {/* Simulator robot is asynchronous, hence two robot images! */}
                <Image
                    ref={this.simulatorRobotImageRef}
                    x={this.props.cavasRobotLocation.x}
                    y={this.props.cavasRobotLocation.y}
                    width={this.props.gridCellSize.width}
                    height={this.props.gridCellSize.height}
                    image={this.props.carriedCar !== null ? this.state.carImage : this.state.robotImage}
                    shadowBlur={5}
                    draggable={!this.props.simulationOn}
                    visible={this.props.simulatorInterface}
                    onClick={() => { this.props.changeRobotIsCarrying() }}
                    onDragStart={() => { this.setScale(1.2, 1.2) }}
                    onDragEnd={() => {
                        this.setScale(1, 1);
                        this.propToGrid(this.simulatorRobotImageRef.current._lastPos,
                            { robotLeavingHubAsCarEnters: false });
                    }}
                />
                <Image
                    ref={this.parkingRobotImageRef}
                    x={this.props.cavasRobotLocation.x}
                    y={this.props.cavasRobotLocation.y}
                    width={this.props.gridCellSize.width}
                    height={this.props.gridCellSize.height}
                    visible={!this.props.simulatorInterface}
                    listening={false}
                    image={this.props.carriedCar !== null ? this.state.carImage : this.state.robotImage}
                    shadowBlur={5}
                />
            </Layer>
        );
    }
}

export default Robot;
