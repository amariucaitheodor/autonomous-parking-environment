import React from 'react';
import Canvas from './Canvas';
import Overhead from './cameras/Overhead';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import GridSettings from './GridSettings';
import { Toast } from "react-bootstrap";
import { GoGear } from 'react-icons/go';
import plan from '../actions/plan';
import generatePath from '../actions/generatePath';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: ["R0C1", "R1C1", "R0C3", "R1C3", "R2C0", "R3C0"],
      robotGridStaticLocation: { column: 1, row: 4 },
      robotPath: [], //[{ column: 0, row: 4 }, { column: 1, row: 4 }, { column: 2, row: 4 }, { column: 2, row: 3 }, { column: 2, row: 2 }, { column: 2, row: 1 }, { column: 3, row: 1 }],
      debugMode: false,
      gridSize: { rows: 5, columns: 4 },
      settingsOn: false, // remove?
      simulationOn: false,
      toasts: []
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.changeGridSize = this.changeGridSize.bind(this);
    this.changeRobotGridStaticLocation = this.changeRobotGridStaticLocation.bind(this);
  }

  toggleSpaceAvailable(spaceIndex) {
    let toModifySpacesAvailable = [...this.state.spacesAvailable];
    toModifySpacesAvailable[spaceIndex] = !toModifySpacesAvailable[spaceIndex];
    this.setState({
      spacesAvailable: toModifySpacesAvailable
    });
  }

  changeRobotGridStaticLocation(newColumn, newRow) {
    this.setState({
      robotGridStaticLocation: { column: newColumn, row: newRow }
    });
  }

  addToast = (message) => {
    const toastTemplate = (
      <Toast
        key={this.state.toasts.length + 1}
        onClose={() => this.closeOldestToast()}
        show={true}
        delay={2500}
        autohide
      >
        <Toast.Header>
          <GoGear />
          <strong className="mr-auto ml-2">Replanning...</strong>
          just now
            </Toast.Header>
        <Toast.Body>
          <h6 style={{ color: "rgb(70, 70, 70)" }}>{message}</h6>
        </Toast.Body>
      </Toast>
    );

    var newToasts = this.state.toasts;
    newToasts.push(toastTemplate)
    this.setState({
      toasts: newToasts
    });
  }

  closeOldestToast() {
    var newToasts = this.state.toasts;
    newToasts.shift();
    this.setState({
      toasts: newToasts
    });
  }

  async toggleSimulation(forced) {
    if (this.state.simulationOn) {
      forced? 
      this.setState({ robotPath: [], simulationOn: false }) :
      this.setState({ simulationOn: false });
    } else {
      let steps = await plan();
      if (steps !== -1) {
        this.setState({
          robotPath: generatePath(steps, this.state.robotGridStaticLocation),
          simulationOn: true // starts robot movement along new path
        });
      } else {
        console.log("Online planner at `http://solver.planning.domains/solve-and-validate` failed.");
      }
    }
  }

  toggleDebugMode() {
    this.setState({
      debugMode: !this.state.debugMode
    });
  }

  toggleSettings() {
    this.setState({
      settingsOn: !this.state.settingsOn
    });
  }

  changeGridSize(x, y) {
    // this.setState({
    //   gridSize: { gridSize: x, y: y }
    // });
  }

  componentDidMount() {
    this.addToast("A new car has arrived at hub R2C0!");
    this.addToast("A new car has arrived at hub R3C0!");
    this.addToast("A new car has arrived at hub R4C0!");
    this.addToast("A new obstacle was detected!");
    this.addToast("A new obstacle was detected!");
    this.addToast("A new obstacle was detected!");
  }

  render() {
    return (
      <Router>
        <Navbar
          variant="dark"
          sticky="top"
        >
          <Navbar.Brand>Finitech Operations Monitor</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Parking Lot" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/">View</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => { this.toggleDebugMode() }}
              >Debug Mode</NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => { this.toggleSimulation(true) }}
              >Toggle Simulation</NavDropdown.Item>
              {/* <NavDropdown.Item
                onClick={() => { this.toggleSettings() }}
              >Debug Settings</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Cameras" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/overhead">CCTV</NavDropdown.Item>
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
                height: "94vh", // relative to the height of the viewport
                backgroundColor: "#282c34"
              }}
              className="pt-3"
            >
              <GridSettings
                changeGridSize={this.changeGridSize}
                toggleSettings={this.toggleSettings}
                show={this.state.settingsOn}
              />
              <Container fluid>
                <Row>
                  <Col xs={10}>
                    <Canvas
                      toggleSimulation={this.toggleSimulation}
                      changeRobotGridStaticLocation={this.changeRobotGridStaticLocation}
                      simulationOn={this.state.simulationOn}
                      gridSize={this.state.gridSize}
                      robotGridStaticLocation={this.state.robotGridStaticLocation}
                      robotPath={this.state.robotPath}
                      debugMode={this.state.debugMode}
                      spacesAvailable={this.state.spacesAvailable}
                    />
                  </Col>
                  <Col xs={2}>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      style={{
                        position: 'absolute',
                        bottom: 5,
                        width: "90%",
                      }}
                    >
                      {this.state.toasts}
                    </div>
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
