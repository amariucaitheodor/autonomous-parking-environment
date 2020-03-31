import React from 'react';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppBar from './AppBar';
import MonitorInterface from './monitor/MonitorInterface';
import MonitorPanel from './monitor/MonitorPanel';
import SurveillanceInterface from './surveillance/SurveillanceInterface';
import SurveillancePanel from './surveillance/SurveillancePanel';
import PublicInterface from './public_interface/PublicInterface';
import PublicPanel from './public_interface/PublicPanel';
import plan from '../actions/generatePlan';
import processCommands from '../actions/processPlan';
import generateProblem from '../actions/generateProblem.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme, tileType, tileCarStatus, randomLicensePlate } from './Configuration';
import CssBaseline from '@material-ui/core/CssBaseline';
import plannerTests from '../assets/planner/tests';

class App extends React.PureComponent {
  constructor() {
    super();

    // if (process.env.NODE_ENV === 'development') {
    //   const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
    //   whyDidYouRender(React, {
    //     trackAllPureComponents: true,
    //   });
    // }

    this.state = {
      // General configuration
      globalPlanView: false,
      showLoader: false,
      // Parking Lot Monitor configuration
      parkingLotConfiguration: [
        [{ type: tileType.INACCESSIBLE }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_DELIVERY } }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.INACCESSIBLE }, { type: tileType.PARKING }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_OWNER } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_DELIVERY } }],
        [{ type: tileType.HUB }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING }],
        [{ type: tileType.HUB, car: { license: randomLicensePlate(), status: tileCarStatus.AWAITING_PARKING } }, { type: tileType.ROAD }, { type: tileType.ROAD }, { type: tileType.PARKING, car: { license: randomLicensePlate(), status: tileCarStatus.IDLE } }]
      ],
      carriedCarParking: null,
      robotLocationParking: { col: 1, row: 4 },
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
      robotLocationSimulator: { col: 0, row: 0 },
      robotCommandsSimulator: [],
      debugModeSimulator: false,
      logsSimulator: [null, null, null, null, null, null, null],
      spacesAvailableSimulator: 10,
      spacesTotalSimulator: 10,
      // Simulator specific configuration
      robotTargetSimulator: null,
      simulationOn: false,
      simulationAboutToStartOrStarted: false,
      simulatorLocalPathsProgress: null
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
    this.changeTileType = this.changeTileType.bind(this);
    this.changeCarStatusOnTile = this.changeCarStatusOnTile.bind(this);
    this.runTest = this.runTest.bind(this);
    this.toggleGlobalPlanView = this.toggleGlobalPlanView.bind(this);
    this.changeRobotIsCarrying = this.changeRobotIsCarrying.bind(this);
    this.carRequestedReplan = this.carRequestedReplan.bind(this);
    this.carRetrievedReplan = this.carRetrievedReplan.bind(this);
    this.carArrivedReplan = this.carArrivedReplan.bind(this);
    this.changeRobotTarget = this.changeRobotTarget.bind(this);
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
      row: plannerTests[testNumber].robotTestLocation.row,
      col: plannerTests[testNumber].robotTestLocation.col
    });
    let newConfiguration = JSON.parse(JSON.stringify(plannerTests[testNumber].testConfiguration));
    this.updateConfiguration(newConfiguration, true);
    this.setState({
      robotCommandsSimulator: [],
      carriedCarSimulator: plannerTests[testNumber].carriedCar,
    }, () => { this.toggleSimulation() });
  }

  addLog(event, toSimulatorPanel) {
    var newLogs = [...toSimulatorPanel ? this.state.logsSimulator : this.state.logsParking];
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
    var firstStatus = newConfiguration[position.row][position.col].type === tileType.PARKING ? tileCarStatus.AWAITING_DELIVERY : tileCarStatus.AWAITING_PARKING;
    var secondStatus = newConfiguration[position.row][position.col].type === tileType.PARKING ? tileCarStatus.IDLE : tileCarStatus.AWAITING_OWNER;

    let newCar = null;
    if (newConfiguration[position.row][position.col].car === undefined) {
      newCar = { license: randomLicensePlate(), status: firstStatus };
    } else switch (newConfiguration[position.row][position.col].car.status) {
      case firstStatus:
        newCar = { license: randomLicensePlate(), status: secondStatus };
        break;
      case secondStatus:
        newCar = undefined;
        break;
      default:
        console.error(`Tried to change car status in simulator, but existing car status is unrecognized ${newConfiguration[position.row][position.col]}`)
        break;
    }

    newConfiguration[position.row][position.col] = { type: newConfiguration[position.row][position.col].type, car: newCar }
    this.updateConfiguration(newConfiguration, true);
  }

  changeRobotIsCarrying() {
    if (this.state.simulatorConfiguration[this.state.robotLocationSimulator.row][this.state.robotLocationSimulator.col].car !== undefined ||
      this.state.simulationAboutToStartOrStarted)
      return;

    let newCar = null;
    if (this.state.carriedCarSimulator === null) {
      newCar = { license: randomLicensePlate(), status: tileCarStatus.AWAITING_DELIVERY };
    } else if (this.state.carriedCarSimulator.status === tileCarStatus.AWAITING_DELIVERY) {
      newCar = { license: randomLicensePlate(), status: tileCarStatus.AWAITING_PARKING };
    }

    this.setState({
      carriedCarSimulator: newCar
    });
  }

  changeTileType(position) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    let newType = null;
    switch (newConfiguration[position.row][position.col].type) {
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
        console.error(`Tried to change tile type in simulator, but existing type is unrecognized ${newConfiguration[position.row][position.col]}`)
        break;
    }
    newConfiguration[position.row][position.col] = { type: newType };
    this.updateConfiguration(newConfiguration, true);
  }

  liftCarFromTile(tilePosition, fromSimulator) {
    let newConfiguration = [...fromSimulator ? this.state.simulatorConfiguration : this.state.parkingLotConfiguration];
    let carriedCar = newConfiguration[tilePosition.row][tilePosition.col].car;

    newConfiguration[tilePosition.row][tilePosition.col] = { type: newConfiguration[tilePosition.row][tilePosition.col].type };
    this.updateConfiguration(newConfiguration, fromSimulator);
    if (fromSimulator)
      this.setState({
        carriedCarSimulator: carriedCar,
        simulatorLocalPathsProgress: this.state.simulatorLocalPathsProgress + 1
      });
    else
      this.setState({
        carriedCarParking: carriedCar,
      });

    this.addLog({
      title: `Lifted ${carriedCar.license} (R${tilePosition.row}C${tilePosition.col})`,
      type: "moving",
      time: new Date()
    }, fromSimulator);
  }

  dropCarOnTile(tilePosition, toSimulator) {
    let carriedCar = toSimulator ? this.state.carriedCarSimulator : this.state.carriedCarParking;
    let newConfiguration = [...toSimulator ? this.state.simulatorConfiguration : this.state.parkingLotConfiguration];

    switch (carriedCar.status) {
      case "AwaitingParking":
        var event = "Parked";
        var eventType = "parking";
        break;
      case "Idle":
        event = "Transferred";
        eventType = "transfer";
        break;
      case "AwaitingDelivery":
        if (newConfiguration[tilePosition.row][tilePosition.col].type === tileType.PARKING) {
          event = "Transferred";
          eventType = "transfer";
        } else {
          event = "Delivered";
          eventType = "delivery";
        }
        break;
      default:
        console.error("Unknown carriedCar status when posting new log on car dropped");
    }

    this.addLog({
      title: `${event} ${carriedCar.license} (R${tilePosition.row}C${tilePosition.col})`,
      type: eventType,
      time: new Date()
    }, toSimulator);

    newConfiguration[tilePosition.row][tilePosition.col] = {
      type: newConfiguration[tilePosition.row][tilePosition.col].type,
      car: {
        license: carriedCar.license,
        status: newConfiguration[tilePosition.row][tilePosition.col].type === tileType.HUB ?
          tileCarStatus.AWAITING_OWNER :
          (carriedCar.status === tileCarStatus.AWAITING_DELIVERY ? tileCarStatus.AWAITING_DELIVERY : tileCarStatus.IDLE)
      }
    }
    this.updateConfiguration(newConfiguration, toSimulator);
    if (toSimulator)
      this.setState({
        carriedCarSimulator: null,
        simulatorLocalPathsProgress: this.state.simulatorLocalPathsProgress + 1
      });
    else
      this.setState({
        carriedCarParking: null,
      });
  }

  changeRobotGridLocation(newLocation) {
    this.setState({
      robotLocationSimulator: { col: newLocation.col, row: newLocation.row }
    });
  }

  changeRobotTarget(newTarget) {
    this.setState({
      robotTargetSimulator: { col: newTarget.col - 1, row: newTarget.row - 1 }
    });
  }

  toggleGlobalPlanView(fromSimulator) {
    this.setState({
      globalPlanView: !this.state.globalPlanView
    });
    this.addLog({
      title: this.state.globalPlanView ? "View has changed to global" : "View has changed to local",
      type: "settings",
      time: new Date()
    }, fromSimulator);
  }

  async toggleSimulation(stopStatus) {
    this.setState({ simulationAboutToStartOrStarted: true }, async () => {
      if (this.state.simulationOn) {
        this.setState({
          simulationOn: false,
          simulationAboutToStartOrStarted: false,
          robotCommandsSimulator: [],
        });
        this.addLog({
          title: stopStatus,
          type: "standby",
          time: new Date()
        }, true);
      } else {
        this.addLog({
          title: "Generating plan...",
          type: "planning",
          time: new Date()
        }, true);

        this.setState({ showLoader: true });

        let commands = await plan(
          generateProblem(
            this.state.robotLocationSimulator,
            this.state.simulatorConfiguration,
            this.state.carriedCarSimulator
          )
        );

        if (typeof commands !== "string") {
          var processedCommands = processCommands(commands, this.state.robotLocationSimulator);

          this.totalLocalPaths = 0;
          processedCommands.forEach(processedCommand => {
            if (processedCommand.pickupCar || processedCommand.dropCar)
              this.totalLocalPaths++;
          });

          this.setState({
            robotCommandsSimulator: processedCommands,
            simulationOn: true,
            simulationAboutToStartOrStarted: true,
            simulatorLocalPathsProgress: 0
          }, () => {
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
          else if (commands.includes("Parse status: err"))
            this.addLog({
              title: "Failed to parse the plan",
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
            simulationAboutToStartOrStarted: false,
          });
        }
        this.setState({ showLoader: false });
      }
    });
  }

  carRetrievedReplan(replanPosition) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    let carLicenseRetrieved = newConfiguration[replanPosition.row][replanPosition.col].car.license;

    newConfiguration[replanPosition.row][replanPosition.col] = {
      type: newConfiguration[replanPosition.row][replanPosition.col].type
    };
    this.updateConfiguration(newConfiguration, true);

    this.addLog({
      title: `Owner retrieved ${carLicenseRetrieved} (R${replanPosition.row}C${replanPosition.col})`,
      type: "external",
      time: new Date()
    }, true);
    this.toggleSimulation("Stopped to replan");
    this.toggleSimulation();
  }

  carRequestedReplan(replanPosition) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    let carRequestedLicense = newConfiguration[replanPosition.row][replanPosition.col].car.license;

    newConfiguration[replanPosition.row][replanPosition.col] = {
      type: newConfiguration[replanPosition.row][replanPosition.col].type,
      car: {
        license: carRequestedLicense,
        status: tileCarStatus.AWAITING_DELIVERY
      }
    };
    this.updateConfiguration(newConfiguration, true);

    this.addLog({
      title: `Requested ${carRequestedLicense} (R${replanPosition.row}C${replanPosition.col})`,
      type: "external",
      time: new Date()
    }, true);
    this.toggleSimulation("Stopped to replan");
    this.toggleSimulation();
  }

  carArrivedReplan(replanPosition) {
    let newConfiguration = [...this.state.simulatorConfiguration];
    let newLicense = randomLicensePlate();

    newConfiguration[replanPosition.row][replanPosition.col] = {
      type: newConfiguration[replanPosition.row][replanPosition.col].type,
      car: {
        license: newLicense,
        status: tileCarStatus.AWAITING_PARKING
      }
    }
    this.updateConfiguration(newConfiguration, true);

    this.addLog({
      title: `${newLicense} arrived at (R${replanPosition.row}C${replanPosition.col})`,
      type: "external",
      time: new Date()
    }, true);
    this.toggleSimulation("Stopped to replan");
    this.toggleSimulation();
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
    // Used to easily create new tests:
    // console.log(JSON.stringify(this.state.robotLocationSimulator));
    // console.log(JSON.stringify(this.state.simulatorConfiguration));

    // Deep cloning variables:
    this.robotSavedLocation = JSON.parse(JSON.stringify(this.state.robotLocationSimulator));
    this.simulatorSavedConfiguration = JSON.parse(JSON.stringify(this.state.simulatorConfiguration));
  }

  resetConfiguration() {
    if (JSON.stringify(this.simulatorSavedConfiguration) !== JSON.stringify(this.state.simulatorConfiguration)) {
      this.updateConfiguration(JSON.parse(JSON.stringify(this.simulatorSavedConfiguration)), true);
    }

    if (JSON.stringify(this.robotSavedLocation) !== JSON.stringify(this.state.robotLocationSimulator)) {
      this.changeRobotGridLocation({
        row: this.robotSavedLocation.row,
        col: this.robotSavedLocation.col
      });
    }
  }

  static whyDidYouRender = true
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
              <MonitorInterface
                simulatorInterface={false}
                configuration={this.state.parkingLotConfiguration}
                carriedCar={this.state.carriedCarParking}
                changeRobotGridLocation={this.changeRobotGridLocation}
                robotLocation={this.state.robotLocationParking}
                robotCommands={this.state.robotCommandsParking}
                debugMode={this.state.debugModeParking}
                liftCarFromTile={this.liftCarFromTile}
                dropCarOnTile={this.dropCarOnTile}
                globalPlanView={this.state.globalPlanView}
              />
              <MonitorPanel
                simulatorPanel={false}
                spacesAvailable={this.state.spacesAvailableParking}
                spacesTotal={this.state.spacesTotalParking}
                carriedCar={this.state.carriedCarParking}
                debugMode={this.state.debugModeParking}
                toggleDebugMode={this.toggleDebugMode}
                logs={this.state.logsParking}
                globalPlanView={this.state.globalPlanView}
                toggleGlobalPlanView={this.toggleGlobalPlanView}
              />
            </Route>
            <Route path="/">
              <MonitorInterface
                simulatorInterface={true}
                configuration={this.state.simulatorConfiguration}
                carriedCar={this.state.carriedCarSimulator}
                changeRobotGridLocation={this.changeRobotGridLocation}
                robotLocation={this.state.robotLocationSimulator}
                robotCommands={this.state.robotCommandsSimulator}
                debugMode={this.state.debugModeSimulator}
                liftCarFromTile={this.liftCarFromTile}
                dropCarOnTile={this.dropCarOnTile}
                showLoader={this.state.showLoader}
                // Simulator specific configuration
                changeRobotTarget={this.changeRobotTarget}
                changeRobotIsCarrying={this.changeRobotIsCarrying}
                simulationOn={this.state.simulationOn}
                toggleSimulation={this.toggleSimulation}
                changeTileType={this.changeTileType}
                changeCarStatusOnTile={this.changeCarStatusOnTile}
                globalPlanView={this.state.globalPlanView}
                simulatorLocalPathsProgress={this.state.simulatorLocalPathsProgress}
                carRetrievedReplan={this.carRetrievedReplan}
                carRequestedReplan={this.carRequestedReplan}
                carArrivedReplan={this.carArrivedReplan}
                simulationAboutToStartOrStarted={this.state.simulationAboutToStartOrStarted}
                robotTargetSimulator={this.state.robotTargetSimulator}
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
                showLoader={this.state.showLoader}
                simulationOn={this.state.simulationOn}
                toggleSimulation={this.toggleSimulation}
                simulationAboutToStartOrStarted={this.state.simulationAboutToStartOrStarted}
                resetConfiguration={this.resetConfiguration}
                saveConfiguration={this.saveConfiguration}
                runTest={this.runTest}
                globalPlanView={this.state.globalPlanView}
                toggleGlobalPlanView={this.toggleGlobalPlanView}
                simulatorLocalPathsProgress={this.state.simulatorLocalPathsProgress}
                totalLocalPaths={this.totalLocalPaths}
                robotTargetSimulator={this.state.robotTargetSimulator}
              />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router >
    );
  }
}

export default App;