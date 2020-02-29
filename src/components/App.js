import React from 'react';
import Canvas from './canvas/Canvas';
import Overhead from './cameras/Overhead';
import Notifications from './Notifications';
import './App.css';
import initialMap from '../assets/initialMap';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import plan from '../actions/plan';
import processCommands from '../actions/processCommands';
import generateProblem from '../actions/generateProblem.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [
        { location: { row: 0, column: 1 }, licensePlate: "SAG 984", status: "AwaitingDelivery" },
        { location: { row: 2, column: 3 }, licensePlate: "SBG 985", status: "AwaitingDelivery" },
        { location: { row: 4, column: 3 }, licensePlate: "SBG 985", status: null },
        { location: { row: 2, column: 0 }, licensePlate: "SDG 987", status: null },
        { location: { row: 4, column: 0 }, licensePlate: "SEG 988", status: "AwaitingParking" },
      ],
      map: initialMap,
      carriedCar: null,
      robotGridStaticLocation: { column: 1, row: 4 },
      robotCommands: [],
      debugMode: false,
      gridSize: { rows: 5, columns: 4 },
      simulationOn: false,
      alreadyActivated: false,
      resizableCanvas: false,
    };
    this.initialCars = this.state.cars;
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.shiftPath = this.shiftPath.bind(this);
    this.removeCar = this.removeCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.changeRobotGridStaticLocation = this.changeRobotGridStaticLocation.bind(this);
  }

  removeCar(row, column) {
    var foundCarIndex = null;
    for (var i = 0; i < this.state.cars.length; i++) {
      if (this.state.cars[i].location.row === row && this.state.cars[i].location.column === column) {
        foundCarIndex = i;
        break;
      }
    }

    if (foundCarIndex !== null) {
      var carriedStatus = this.state.cars[foundCarIndex].status.includes("Park") ? "Parking in Progress" : "Delivery in Progress";
      let newCars = [...this.state.cars];
      newCars.splice(foundCarIndex, 1);
      this.setState({
        carriedCar: { licensePlate: this.state.cars[foundCarIndex].licensePlate, status: carriedStatus },
        cars: newCars,
      });
    }
  }

  addCar(row, column) {
    var foundCarIndex = null;
    for (var i = 0; i < this.state.cars.length; i++) {
      if (this.state.cars[i].location.row === row && this.state.cars[i].location.column === column) {
        foundCarIndex = i;
        break;
      }
    }

    if (foundCarIndex === null) {
      let newCars = [...this.state.cars];
      newCars.push({
        location: { row: row, column: column },
        licensePlate: this.state.carriedCar.licensePlate,
        status: null // after AwaitingParking car is simply idle, after AwaitingDelivery car is awaiting owner
      });
      this.setState({
        carriedCar: null,
        cars: newCars
      });
    }
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
    if (this.state.simulationOn) {
      if (forced) {
        // not working
        this.setState({ robotPath: [], simulationOn: false });
      }
      else
        this.setState({ simulationOn: false, alreadyActivated: false });
    } else {
      let commands = await plan(generateProblem(
        this.state.robotGridStaticLocation,
        this.state.cars,
        null,
        null));
      if (commands !== -1) {
        this.setState({
          robotCommands: processCommands(commands, this.state.robotGridStaticLocation),
          simulationOn: true,
          alreadyActivated: false
        }, () => { this.setState({ alreadyActivated: true }) });
      }
    }
  }

  toggleDebugMode() {
    this.setState({
      debugMode: !this.state.debugMode
    });
  }

  render() {
    return (
      <Router>
        <Navbar
          variant="dark"
          sticky="top"
          style={{
            width: "1920px"
          }}
        >
          <Navbar.Brand>Finitech Operations Monitor</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Parking Lot" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/">View</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => { this.toggleDebugMode(); }}
              >Debug Mode
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => { this.toggleSimulation(true) }}
              >Toggle Simulation
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cameras" id="collasible-nav-dropdown">
              <NavDropdown.Item {... !this.state.simulationOn ? { href: "#/overhead" } : {}}>CCTV</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/overhead">
            <Overhead />
          </Route>
          <Route path="/">
            <div
              style={{
                height: "877px",
                width: "1920px",
                backgroundColor: "#282c34"
              }}
              className="pt-3"
            >
              <Container fluid>
                <Row>
                  <Col xs={8}>
                    <Canvas
                      map={this.state.map}
                      shiftPath={this.shiftPath}
                      carriedCar={this.state.carriedCar}
                      resizable={this.state.resizableCanvas}
                      alreadyActivated={this.state.alreadyActivated}
                      removeCar={this.removeCar}
                      addCar={this.addCar}
                      toggleSimulation={this.toggleSimulation}
                      changeRobotGridStaticLocation={this.changeRobotGridStaticLocation}
                      simulationOn={this.state.simulationOn}
                      gridSize={this.state.gridSize}
                      robotGridStaticLocation={this.state.robotGridStaticLocation}
                      robotPath={this.state.robotCommands}
                      debugMode={this.state.debugMode}
                      cars={this.state.cars}
                    />
                  </Col>
                  <Col xs={4}>
                    <Notifications />
                  </Col>
                </Row>
              </Container>
            </div>
          </Route>
        </Switch>
      </Router >
    );
  }
}

export default App;
