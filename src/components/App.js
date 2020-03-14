import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from './AppBar';
import MonitorInterface from './monitor/MonitorInterface';
import MonitorPanel from './monitor/MonitorPanel';
// import Websockets from './monitor/Websockets';
import SurveillanceInterface from './surveillance/SurveillanceInterface';
import SurveillancePanel from './surveillance/SurveillancePanel';
import PublicInterface from './public_interface/PublicInterface';
import PublicPanel from './public_interface/PublicPanel';
import plan from '../actions/generatePlan';
import processCommands from '../actions/processPlan';
import generateProblem from '../actions/generateProblem.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme, tileType, tileCarStatus, drawerWidth, MATERIAL_UI_APP_BAR_HEIGHT } from './Configuration';
import CssBaseline from '@material-ui/core/CssBaseline';
import plannerTests from '../assets/planner/tests';

function randomLicensePlate() {
  const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var res = "";
  for (var i = 0; i < 6; i++) {
    var rnd = Math.floor(Math.random() * list.length);
    res = res + list.charAt(rnd);
  }
  return res;
}

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
        [{ type: tileType.INACCESSIBLE }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_DELIVERY } }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.INACCESSIBLE }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_OWNER } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_DELIVERY } }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_PARKING } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.IDLE } }]
      ],
      carriedCarParking: null,
      robotLocationParking: { column: 1, row: 4 },
      robotCommandsParking: [],
      debugModeParking: false,
      logsParking: [null, null, null, null, null, null, null, null, null],
      spacesAvailableParking: 4,
      spacesTotalParking: 7,
      // Simulator Monitor configuration
      simulatorConfiguration: [
        [{ type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.INACCESSIBLE }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.INACCESSIBLE }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.PARKING }, { type: tileType.INACCESSIBLE }, { type: tileType.PARKING }, { type: tileType.ROAD }],
        [{ type: tileType.INACCESSIBLE }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.ROAD }],
      ],
      carriedCarSimulator: null,
      robotLocationSimulator: { column: 0, row: 0 },
      robotCommandsSimulator: [],
      debugModeSimulator: false,
      logsSimulator: [null, null, null, null, null, null, null],
      spacesAvailableSimulator: 10,
      spacesTotalSimulator: 10,
      // Simulator specific configuration
      simulationOn: false,
      alreadyActivated: false,
      simulationButtonsDisabled: false,
    };

    this.saveConfiguration();

    this.simulatorLogSize = 7;
    this.parkingLogSize = 9;

    this.addLog = this.addLog.bind(this);
    this.toggleDebugMode = this.toggleDebugMode.bind(this);
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.liftCarFromTile = this.liftCarFromTile.bind(this);
    this.dropCarOnTile = this.dropCarOnTile.bind(this);
    this.changeRobotGridLocation = this.changeRobotGridLocation.bind(this);
    this.resetConfiguration = this.resetConfiguration.bind(this);
    this.saveConfiguration = this.saveConfiguration.bind(this);
    this.checkForResize = this.checkForResize.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
    this.changeCarStatusOnTile = this.changeCarStatusOnTile.bind(this);
    this.runTest = this.runTest.bind(this);
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

  updateConfiguration(newConfiguration, forSimulator) {
    let calculatedSpaces = this.recalculateSpaces(newConfiguration);
    if (forSimulator)
      this.setState({
        simulatorConfiguration: newConfiguration,
        spacesTotalSimulator: calculatedSpaces.spacesTotal,
        spacesAvailableSimulator: calculatedSpaces.spacesAvailable,
      });
    else
      this.setState({
        parkingLotConfiguration: newConfiguration,
        spacesTotalParking: calculatedSpaces.spacesTotal,
        spacesAvailableParking: calculatedSpaces.spacesAvailable,
      });
  }

  runTest(testNumber) {
    // Reset configuration and robot position to test settings
    this.changeRobotGridLocation({
      newRow: plannerTests[testNumber].robotTestLocation.row,
      newColumn: plannerTests[testNumber].robotTestLocation.column
    });
    let newConfiguration = JSON.parse(JSON.stringify(plannerTests[testNumber].testConfiguration));
    this.updateConfiguration(newConfiguration, true);
    this.setState({
      robotCommandsSimulator: []
    }, () => { this.toggleSimulation(false) });
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

  addLog(event, toSimulatorPanel) {
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

  changeCarStatusOnTile(position) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    var firstStatus = newConfiguration[position.row][position.column].type === tileType.PARKING ? tileCarStatus.AWAITING_DELIVERY : tileCarStatus.AWAITING_PARKING;
    var secondStatus = newConfiguration[position.row][position.column].type === tileType.PARKING ? tileCarStatus.IDLE : tileCarStatus.AWAITING_OWNER;

    let newCar = null;
    if (newConfiguration[position.row][position.column].car === undefined) {
      newCar = { license: randomLicensePlate(), status: firstStatus };
    } else switch (newConfiguration[position.row][position.column].car.status) {
      case firstStatus:
        newCar = { license: randomLicensePlate(), status: secondStatus };
        break;
      case secondStatus:
        newCar = undefined;
        break;
      default:
        console.error(`Tried to change car status in simulator, but existing car status is unrecognized ${newConfiguration[position.row][position.column]}`)
        break;
    }

    newConfiguration[position.row][position.column] = { type: newConfiguration[position.row][position.column].type, car: newCar }
    this.updateConfiguration(newConfiguration, true);
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
        newType = tileType.INACCESSIBLE;
        break;
      case tileType.INACCESSIBLE:
        newType = tileType.PARKING;
        break;
      default:
        console.error(`Tried to change tile type in simulator, but existing type is unrecognized ${newConfiguration[position.row][position.column]}`)
        break;
    }
    newConfiguration[position.row][position.column] = { type: newType };
    this.updateConfiguration(newConfiguration, true);
  }

  liftCarFromTile(row, column, fromSimulator) {
    let newConfiguration = [...fromSimulator ? this.state.simulatorConfiguration : this.state.parkingLotConfiguration];
    let carriedCar = newConfiguration[row][column].car;
    newConfiguration[row][column] = { type: newConfiguration[row][column].type };
    this.updateConfiguration(newConfiguration, fromSimulator);
    if (fromSimulator)
      this.setState({
        carriedCarSimulator: carriedCar,
      });
    else
      this.setState({
        carriedCarParking: carriedCar,
      });

    this.addLog({
      title: "Picked up " + carriedCar.license + " from R" + row + "C" + column,
      type: "moving",
      time: new Date()
    }, fromSimulator);
  }

  dropCarOnTile(row, column, toSimulator) {
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
        status: newConfiguration[row][column].type === tileType.HUB ? tileCarStatus.AWAITING_OWNER : tileCarStatus.IDLE
      }
    }
    this.updateConfiguration(newConfiguration, toSimulator);
    if (toSimulator)
      this.setState({
        carriedCarSimulator: null,
      });
    else
      this.setState({
        carriedCarParking: null,
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
          this.addLog({
            title: "Robot is now on standby",
            type: "standby",
            time: new Date()
          }, true);
          this.checkForResize();
        });
      } else {
        this.addLog({
          title: "Starting to plan...",
          type: "success",
          time: new Date()
        }, true);
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
            this.addLog({
              title: "Planning succeeded",
              type: "success",
              time: new Date()
            }, true);
          });
        } else {
          if (commands.includes("The empty plan solves it"))
            this.addLog({
              title: "There is nothing to do",
              type: "fail",
              time: new Date()
            }, true);
          else if (commands.includes("No plan will solve it"))
            this.addLog({
              title: "Goal is impossible to reach",
              type: "fail",
              time: new Date()
            }, true);
          else if (commands.includes("Suspected timeout"))
            this.addLog({
              title: "Planning timed out",
              type: "fail",
              time: new Date()
            }, true);
          else
            this.addLog({
              title: "Planning failed",
              type: "fail",
              time: new Date()
            }, true);
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

  saveConfiguration() {
    // console.log(JSON.stringify(this.state.robotLocationSimulator));
    // console.log(JSON.stringify(this.state.simulatorConfiguration));
    this.robotSavedLocation = JSON.parse(JSON.stringify(this.state.robotLocationSimulator));
    this.simulatorSavedConfiguration = JSON.parse(JSON.stringify(this.state.simulatorConfiguration));
  }

  resetConfiguration() {
    this.changeRobotGridLocation({
      newRow: this.robotSavedLocation.row,
      newColumn: this.robotSavedLocation.column
    });
    // Deep cloned:
    let newConfiguration = JSON.parse(JSON.stringify(this.simulatorSavedConfiguration));
    this.updateConfiguration(newConfiguration, true);
    this.setState({
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
                liftCarFromTile={this.liftCarFromTile}
                dropCarOnTile={this.dropCarOnTile}
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
                simulatorInterface={true}
                size={{ monitorHeight: this.state.monitorHeight, monitorWidth: this.state.monitorWidth }}
                configuration={this.state.simulatorConfiguration}
                carriedCar={this.state.carriedCarSimulator}
                changeRobotGridLocation={this.changeRobotGridLocation}
                robotLocation={this.state.robotLocationSimulator}
                robotCommands={this.state.robotCommandsSimulator}
                debugMode={this.state.debugModeSimulator}
                liftCarFromTile={this.liftCarFromTile}
                dropCarOnTile={this.dropCarOnTile}
                // Simulator specific configuration
                simulationOn={this.state.simulationOn}
                toggleSimulation={this.toggleSimulation}
                alreadyActivated={this.state.alreadyActivated}
                changeTileType={this.changeTileType}
                changeCarStatusOnTile={this.changeCarStatusOnTile}
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
                saveConfiguration={this.saveConfiguration}
                runTest={this.runTest}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router >
    );
  }
}

export default App;