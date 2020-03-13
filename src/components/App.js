import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from './AppBar';
import MonitorInterface from './monitor/MonitorInterface';
import MonitorPanel from './monitor/MonitorPanel';
// import Websockets from './monitor/Websockets';
import SurveillanceInterface from './surveillance/SurveillanceInterface';
import SurveillancePanel from './surveillance/SurveillancePanel';
import PublicInterface from './public-interface/PublicInterface';
import PublicPanel from './public-interface/PublicPanel';
import plan from '../actions/generatePlan';
import processCommands from '../actions/processPlan';
import generateProblem from '../actions/generateProblem.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme, tileType, drawerWidth, MATERIAL_UI_APP_BAR_HEIGHT } from './Configuration';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // General configuration
      resizableMonitor: true,
      monitorWidth: window.innerWidth - drawerWidth,
      monitorHeight: window.innerHeight - MATERIAL_UI_APP_BAR_HEIGHT,
      // Parking Lot Monitor configuration
      parkingLotConfiguration: [
        [{ type: tileType.BLOCKED }, { type: tileType.PARKING, car: { license: 'SAG 984', status: 'AwaitingDelivery' } }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.BLOCKED }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: 'SAG 985', status: null } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: 'SAG 986', status: 'AwaitingDelivery' } }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: 'SAG 988', status: 'AwaitingParking' } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: 'SAG 987', status: null } }]
      ],
      carriedCarParking: null,
      robotLocationParking: { column: 1, row: 4 },
      robotCommandsParking: [],
      debugModeParking: false,
      logsParking: [null, null, null, null, null, null, null, null, null],
      spacesAvailableParking: null,
      spacesTotalParking: null,
      // Simulator Monitor configuration
      simulatorConfiguration: [
        [{ type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.BLOCKED }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.BLOCKED }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.BLOCKED }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.BLOCKED }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }],
      ],
      carriedCarSimulator: null,
      robotLocationSimulator: { column: 0, row: 0 },
      robotCommandsSimulator: [],
      debugModeSimulator: false,
      logsSimulator: [null, null, null, null, null, null, null],
      spacesAvailableSimulator: null,
      spacesTotalSimulator: null,
      // Simulator specific configuration
      simulatorInitialConfiguration: null,
      robotInitialLocation: null,
      simulationOn: false,
      alreadyActivated: false,
      simulationButtonsDisabled: false,
    };
    // Deep cloned:
    this.state.simulatorInitialConfiguration = JSON.parse(JSON.stringify(this.state.simulatorConfiguration));
    this.state.robotInitialLocation = this.state.robotLocationSimulator;

    let calculatedSpaces = this.recalculateSpaces(this.state.parkingLotConfiguration);
    this.state.spacesTotalParking = calculatedSpaces.spacesTotal;
    this.state.spacesAvailableParking = calculatedSpaces.spacesAvailable;

    calculatedSpaces = this.recalculateSpaces(this.state.simulatorConfiguration);
    this.state.spacesTotalSimulator = calculatedSpaces.spacesTotal;
    this.state.spacesAvailableSimulator = calculatedSpaces.spacesAvailable;

    this.simulatorLogSize = 7;
    this.parkingLogSize = 9;

    this.addLog = this.addLog.bind(this);
    this.toggleDebugMode = this.toggleDebugMode.bind(this);
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.removeCar = this.removeCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.changeRobotGridLocation = this.changeRobotGridLocation.bind(this);
    this.resetConfiguration = this.resetConfiguration.bind(this);
    this.checkForResize = this.checkForResize.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.checkForResize);
  }

  checkForResize() {
    if (this.state.simulationOn || !this.state.resizableMonitor)
      return;

    if (window.innerHeight > MATERIAL_UI_APP_BAR_HEIGHT) {
      this.setState({
        monitorHeight: window.innerHeight - MATERIAL_UI_APP_BAR_HEIGHT
      });
    }
    if (window.innerWidth > drawerWidth) {
      this.setState({
        monitorWidth: window.innerWidth - drawerWidth
      });
    }
  }

  addLog = (event, toSimulatorPanel) => {
    var newLogs = toSimulatorPanel ? this.state.logsSimulator : this.state.logsParking;
    if (newLogs.length === (toSimulatorPanel ? this.simulatorLogSize : this.parkingLogSize))
      newLogs.shift();
    newLogs.push(event);
    if (toSimulatorPanel)
      this.setState({
        logsSimulator: newLogs
      });
    else
      this.setState({
        logsParking: newLogs
      });
  }

  recalculateSpaces(configuration) {
    let calculatedSpacesTotal = 0;
    let calculatedSpacesAvailable = 0;
    configuration.forEach(tileRow => {
      tileRow.forEach(tile => {
        if (tile.type === tileType.PARKING) {
          calculatedSpacesTotal++;
          if (tile.car === undefined) {
            calculatedSpacesAvailable++;
          }
        }
      })
    });
    return { spacesTotal: calculatedSpacesTotal, spacesAvailable: calculatedSpacesAvailable };
  }

  changeTileType(position) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    let newType = null;
    switch (newConfiguration[position.row][position.column].type) {
      case tileType.PARKING:
        newType = tileType.ROAD;
        break;
      case tileType.ROAD:
        newType = tileType.HUB;
        break;
      case tileType.HUB:
        newType = tileType.BLOCKED;
        break;
      case tileType.BLOCKED:
        newType = tileType.PARKING;
        break;
      default:
        console.error(`Tried to change tile type in simulator, but existing type is unrecognized ${newConfiguration[position.row][position.column].type}`)
        break;
    }
    newConfiguration[position.row][position.column] = { type: newType }
    let calculatedSpaces = this.recalculateSpaces(newConfiguration);
    this.setState({
      simulatorConfiguration: newConfiguration,
      spacesTotalSimulator: calculatedSpaces.spacesTotal,
      spacesAvailableSimulator: calculatedSpaces.spacesAvailable,
    });
  }

  removeCar(row, column, fromSimulator) {
    let newConfiguration = [...fromSimulator ? this.state.simulatorConfiguration : this.state.parkingLotConfiguration];
    let carriedCar = newConfiguration[row][column].car;
    newConfiguration[row][column] = { type: newConfiguration[row][column].type }
    let calculatedSpaces = this.recalculateSpaces(newConfiguration);
    if (fromSimulator)
      this.setState({
        carriedCarSimulator: carriedCar,
        simulatorConfiguration: newConfiguration,
        spacesTotalSimulator: calculatedSpaces.spacesTotal,
        spacesAvailableSimulator: calculatedSpaces.spacesAvailable,
      });
    else
      this.setState({
        carriedCarParking: carriedCar,
        parkingLotConfiguration: newConfiguration,
        spacesTotalParking: calculatedSpaces.spacesTotal,
        spacesAvailableParking: calculatedSpaces.spacesAvailable,
      });

    this.addLog({ title: "Picked up " + carriedCar.license + " from R" + row + "C" + column, type: "moving", time: new Date() }, fromSimulator);
  }

  addCar(row, column, toSimulator) {
    if (toSimulator) {
      var event = this.state.carriedCarSimulator.status.includes("Park") ? "Parked" : "Delivered";
      var eventType = this.state.carriedCarSimulator.status.includes("Park") ? "parking" : "delivery";
    } else {
      event = this.state.carriedCarParking.status.includes("Park") ? "Parked" : "Delivered";
      eventType = this.state.carriedCarParking.status.includes("Park") ? "parking" : "delivery";
    }

    this.addLog({
      title: event + " " + (toSimulator ? this.state.carriedCarSimulator.license : this.state.carriedCarParking.license) + " at R" + row + "C" + column,
      type: eventType,
      time: new Date()
    }, toSimulator);

    let newConfiguration = [...toSimulator ? this.state.simulatorConfiguration : this.state.parkingLotConfiguration];
    newConfiguration[row][column] = {
      type: newConfiguration[row][column].type,
      car: {
        license: toSimulator ? this.state.carriedCarSimulator.license : this.state.carriedCarParking.license,
        status: null // after AwaitingParking car is simply idle, after AwaitingDelivery car is awaiting owner
      }
    }
    let calculatedSpaces = this.recalculateSpaces(newConfiguration);
    if (toSimulator)
      this.setState({
        carriedCarSimulator: null,
        simulatorConfiguration: newConfiguration,
        spacesTotalSimulator: calculatedSpaces.spacesTotal,
        spacesAvailableSimulator: calculatedSpaces.spacesAvailable,
      });
    else
      this.setState({
        carriedCarParking: null,
        parkingLotConfiguration: newConfiguration,
        spacesTotalParking: calculatedSpaces.spacesTotal,
        spacesAvailableParking: calculatedSpaces.spacesAvailable,
      });
  }

  changeRobotGridLocation({ newRow, newColumn }) {
    this.setState({
      robotLocationSimulator: { column: newColumn, row: newRow }
    });
  }

  async toggleSimulation(forced) {
    this.setState({ simulationButtonsDisabled: true }, async () => {
      if (this.state.simulationOn) {
        if (forced) {
          // not working
        }
        else this.setState({
          simulationOn: false,
          simulationButtonsDisabled: false,
          alreadyActivated: false
        }, () => {
          this.addLog({ title: "Robot is now on standby", type: "standby", time: new Date() }, true);
          this.checkForResize();
        });
      } else {
        let commands = await plan(
          generateProblem(
            this.state.robotLocationSimulator,
            this.state.simulatorConfiguration
          )
        );
        if (typeof commands !== "string") {
          this.setState({
            robotCommandsSimulator: processCommands(commands, this.state.robotLocationSimulator),
            simulationOn: true,
            simulationButtonsDisabled: true,
            alreadyActivated: false
          }, () => {
            this.setState({ alreadyActivated: true })
            this.addLog({ title: "Planning succeeded", type: "success", time: new Date() }, true);
          });
        } else {
          if (commands.includes("goal can be simplified to TRUE. The empty plan solves it"))
            this.addLog({ title: "There is nothing to do", type: "fail", time: new Date() }, true);
          else
            this.addLog({ title: "Planning failed", type: "fail", time: new Date() }, true);
          this.setState({
            simulationButtonsDisabled: false,
          });
        }
      }
    });
  }

  toggleDebugMode(forSimulator) {
    if (forSimulator)
      this.setState({
        debugModeSimulator: !this.state.debugModeSimulator
      });
    else
      this.setState({
        debugModeParking: !this.state.debugModeParking
      });
  }

  resetConfiguration() {
    this.changeRobotGridLocation({ newRow: this.state.robotInitialLocation.row, newColumn: this.state.robotInitialLocation.column });
    this.setState({
      // Deep cloned:
      simulatorConfiguration: JSON.parse(JSON.stringify(this.state.simulatorInitialConfiguration)),
      robotCommandsSimulator: []
    });
  }

  render() {
    return (
      <Router>
        <ThemeProvider
          theme={darkTheme}
        >
          <CssBaseline />
          <AppBar
            simulationOn={this.state.simulationOn}
          />
          <Switch>
            <Route path="/public-interface">
              <ThemeProvider
                theme={lightTheme}
              >
                <PublicInterface />
                <PublicPanel />
              </ThemeProvider>
            </Route>
            <Route path="/surveillance">
              <SurveillanceInterface />
              <SurveillancePanel />
            </Route>
            <Route path="/parking">
              {/* <Websockets /> */}
              <MonitorInterface
                simulatorInterface={false}
                size={{ monitorHeight: this.state.monitorHeight, monitorWidth: this.state.monitorWidth }}
                configuration={this.state.parkingLotConfiguration}
                carriedCar={this.state.carriedCarParking}
                changeRobotGridLocation={this.changeRobotGridLocation}
                robotLocation={this.state.robotLocationParking}
                robotCommands={this.state.robotCommandsParking}
                debugMode={this.state.debugModeParking}
                removeCar={this.removeCar}
                addCar={this.addCar}
              />
              <MonitorPanel
                simulatorPanel={false}
                spacesAvailable={this.state.spacesAvailableParking}
                spacesTotal={this.state.spacesTotalParking}
                carriedCar={this.state.carriedCarParking}
                debugMode={this.state.debugModeParking}
                toggleDebugMode={this.toggleDebugMode}
                logs={this.state.logsParking}
              />
            </Route>
            <Route path="/">
              <MonitorInterface
                changeTileType={this.changeTileType}
                simulatorInterface={true}
                size={{ monitorHeight: this.state.monitorHeight, monitorWidth: this.state.monitorWidth }}
                configuration={this.state.simulatorConfiguration}
                carriedCar={this.state.carriedCarSimulator}
                changeRobotGridLocation={this.changeRobotGridLocation}
                robotLocation={this.state.robotLocationSimulator}
                robotCommands={this.state.robotCommandsSimulator}
                debugMode={this.state.debugModeSimulator}
                removeCar={this.removeCar}
                addCar={this.addCar}
                // Simulator specific configuration
                simulationOn={this.state.simulationOn}
                toggleSimulation={this.toggleSimulation}
                alreadyActivated={this.state.alreadyActivated}
              />
              <MonitorPanel
                simulatorPanel={true}
                spacesAvailable={this.state.spacesAvailableSimulator}
                spacesTotal={this.state.spacesTotalSimulator}
                carriedCar={this.state.carriedCarSimulator}
                debugMode={this.state.debugModeSimulator}
                toggleDebugMode={this.toggleDebugMode}
                logs={this.state.logsSimulator}
                // Simulator specific configuration
                simulationOn={this.state.simulationOn}
                toggleSimulation={this.toggleSimulation}
                simulationButtonsDisabled={this.state.simulationButtonsDisabled}
                resetConfiguration={this.resetConfiguration}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router >
    );
  }
}

export default App;