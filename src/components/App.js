import React from 'react';
import Canvas from './Canvas';
import Camera from './cameras/Camera';
import CameraDrawer from './cameras/CameraPanel';
import ParkingLotPanel from './ParkingLotPanel';
import SimulatorPanel from './SimulatorPanel';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Bar from './Bar';
// import Websockets from './Websockets';
import plan from '../actions/plan';
import processCommands from '../actions/processCommands';
import generateProblem from '../actions/generateProblem.js';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const darkTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    type: 'dark'
  },
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      parkingLotConfiguration: [
        [{ type: 'blocked' }, { type: 'parking', car: { license: 'SAG 984', status: 'AwaitingDelivery' } }, { type: 'road' }, { type: 'parking' }],
        [{ type: 'blocked' }, { type: 'parking' }, { type: 'road' }, { type: 'parking' }],
        [{ type: 'hub', car: { license: 'SAG 985', status: null } }, { type: 'road' }, { type: 'road' }, { type: 'parking', car: { license: 'SAG 986', status: 'AwaitingDelivery' } }],
        [{ type: 'hub' }, { type: 'road' }, { type: 'road' }, { type: 'parking' }],
        [{ type: 'hub', car: { license: 'SAG 988', status: 'AwaitingParking' } }, { type: 'road' }, { type: 'road' }, { type: 'parking', car: { license: 'SAG 987', status: null } }]
      ],
      carriedCar: null,
      robotGridStaticLocation: { column: 1, row: 4 },
      robotCommands: [],
      debugMode: false,
      simulationOn: false,
      alreadyActivated: false,
      resizableCanvas: true,
      parkingLogs: [null, null, null, null, null, null, null, null, null],
      simulationButtonsDisabled: false,
      spacesAvailable: null,
      spacesTotal: null
    };
    let calculatedSpaces = this.recalculateSpaces(this.state.parkingLotConfiguration);
    this.state.spacesTotal = calculatedSpaces.spacesTotal;
    this.state.spacesAvailable = calculatedSpaces.spacesAvailable;
    this.addLog = this.addLog.bind(this);
    this.toggleDebugMode = this.toggleDebugMode.bind(this);
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.shiftPath = this.shiftPath.bind(this);
    this.removeCar = this.removeCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.changeRobotGridStaticLocation = this.changeRobotGridStaticLocation.bind(this);
  }

  addLog = (event) => {
    var newParkingLogs = this.state.parkingLogs;
    if (newParkingLogs.length === 9)
      newParkingLogs.shift();
    newParkingLogs.push(event);
    this.setState({
      parkingLogs: newParkingLogs
    });
  }

  recalculateSpaces(parkingLotConfiguration) {
    let calculatedSpacesTotal = 0;
    let calculatedSpacesAvailable = 0;
    parkingLotConfiguration.forEach(tileRow => {
      tileRow.forEach(tile => {
        if (tile.type === 'parking') {
          calculatedSpacesTotal++;
          if (tile.car === undefined) {
            calculatedSpacesAvailable++;
          }
        }
      })
    });
    return { spacesTotal: calculatedSpacesTotal, spacesAvailable: calculatedSpacesAvailable };
  }

  removeCar(row, column) {
    let newParkingLotConfiguration = [...this.state.parkingLotConfiguration];
    let carriedCar = newParkingLotConfiguration[row][column].car;
    newParkingLotConfiguration[row][column] = { type: newParkingLotConfiguration[row][column].type }
    let calculatedSpaces = this.recalculateSpaces(newParkingLotConfiguration);
    this.setState({
      carriedCar: carriedCar,
      parkingLotConfiguration: newParkingLotConfiguration,
      spacesTotal: calculatedSpaces.spacesTotal,
      spacesAvailable: calculatedSpaces.spacesAvailable,
    });

    this.addLog({ title: "Picked up " + carriedCar.license + " from R" + row + "C" + column, type: "moving" });
  }

  addCar(row, column) {
    var event = this.state.carriedCar.status.includes("Park") ? "Parked" : "Delivered";
    var eventType = this.state.carriedCar.status.includes("Park") ? "parking" : "delivery";
    this.addLog({ title: event + " " + this.state.carriedCar.license + " at R" + row + "C" + column, type: eventType });

    let newParkingLotConfiguration = [...this.state.parkingLotConfiguration];
    newParkingLotConfiguration[row][column] = {
      type: newParkingLotConfiguration[row][column].type,
      car: {
        license: this.state.carriedCar.license,
        status: null // after AwaitingParking car is simply idle, after AwaitingDelivery car is awaiting owner
      }
    }
    let calculatedSpaces = this.recalculateSpaces(newParkingLotConfiguration);
    this.setState({
      carriedCar: null,
      parkingLotConfiguration: newParkingLotConfiguration,
      spacesTotal: calculatedSpaces.spacesTotal,
      spacesAvailable: calculatedSpaces.spacesAvailable,
    });
  }

  shiftPath() {
    let newPath = [...this.state.robotCommands].shift();
    this.setState({
      robotCommands: newPath
    });
  }

  changeRobotGridStaticLocation(newColumn, newRow) {
    this.setState({
      robotGridStaticLocation: { column: newColumn, row: newRow }
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
          this.addLog({ title: "Robot is now on standby", type: "standby" });
        });
      } else {
        let commands = await plan(generateProblem(
          this.state.robotGridStaticLocation,
          this.state.parkingLotConfiguration,
          null,
          null));
        if (typeof commands !== "string") {
          this.setState({
            robotCommands: processCommands(commands, this.state.robotGridStaticLocation),
            simulationOn: true,
            simulationButtonsDisabled: true,
            alreadyActivated: false
          }, () => {
            this.setState({ alreadyActivated: true })
            this.addLog({ title: "Planning succeeded", type: "success" });
          });
        } else {
          if (commands.includes("goal can be simplified to TRUE. The empty plan solves it"))
            this.addLog({ title: "There is nothing to do", type: "fail" });
          else
            this.addLog({ title: "Planning failed", type: "fail" });
          this.setState({
            simulationButtonsDisabled: false,
          });
        }
      }
    });
  }

  toggleDebugMode() {
    this.setState({
      debugMode: !this.state.debugMode
    });
  }

  render() {
    return (
      <Router>
        <ThemeProvider
          theme={darkTheme}
        >
          <CssBaseline />
          <Bar
            theme={darkTheme}
          />
          <Switch>
            <Route path="/overhead">
              <Camera />
              <CameraDrawer />
            </Route>
            <Route path="/parking">
              {/* <Websockets /> */}
              <ParkingLotPanel
                simulationButtonsDisabled={this.state.simulationButtonsDisabled}
                carriedCar={this.state.carriedCar}
                simulationOn={this.state.simulationOn}
                debugMode={this.state.debugMode}
                toggleDebugMode={this.toggleDebugMode}
                toggleSimulation={this.toggleSimulation}
                parkingLogs={this.state.parkingLogs}
                addLog={this.addLog}
                parkingLotConfiguration={this.state.parkingLotConfiguration}
              />
            </Route>
            <Route path="/">
              <Canvas
                parkingLotConfiguration={this.state.parkingLotConfiguration}
                shiftPath={this.shiftPath}
                carriedCar={this.state.carriedCar}
                resizable={this.state.resizableCanvas}
                alreadyActivated={this.state.alreadyActivated}
                removeCar={this.removeCar}
                addCar={this.addCar}
                toggleSimulation={this.toggleSimulation}
                changeRobotGridStaticLocation={this.changeRobotGridStaticLocation}
                simulationOn={this.state.simulationOn}
                robotGridStaticLocation={this.state.robotGridStaticLocation}
                robotPath={this.state.robotCommands}
                debugMode={this.state.debugMode}
              />
              <SimulatorPanel
                spacesAvailable={this.state.spacesAvailable}
                spacesTotal={this.state.spacesTotal}
                simulationButtonsDisabled={this.state.simulationButtonsDisabled}
                carriedCar={this.state.carriedCar}
                simulationOn={this.state.simulationOn}
                debugMode={this.state.debugMode}
                toggleDebugMode={this.toggleDebugMode}
                toggleSimulation={this.toggleSimulation}
                parkingLogs={this.state.parkingLogs}
                addLog={this.addLog}
                parkingLotConfiguration={this.state.parkingLotConfiguration}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router >
    );
  }
}

export default App;
