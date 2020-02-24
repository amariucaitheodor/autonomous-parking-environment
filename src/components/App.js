import React from 'react';
import Canvas from './canvas/Canvas';
import Overhead from './cameras/Overhead';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast } from "react-bootstrap";
import { GoGear } from 'react-icons/go';
import plan from '../actions/plan';
import processCommands from '../actions/processCommands';
import generateProblem from '../actions/generateProblem.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: ["R0C1", "R1C1", "R0C3", "R1C3", "R2C0", "R3C0"],
      robotGridStaticLocation: { column: 1, row: 4 },
      robotCommands: [],
      debugMode: false,
      gridSize: { rows: 5, columns: 4 },
      simulationOn: false,
      alreadyActivated: false,
      toasts: [],
      resizableCanvas: false,
    };
    this.initialSpacesAvailable = this.state.spacesAvailable;
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.setSpaceAvailable = this.setSpaceAvailable.bind(this);
    this.setSpaceBusy = this.setSpaceBusy.bind(this);
    this.changeRobotGridStaticLocation = this.changeRobotGridStaticLocation.bind(this);
  }

  setSpaceAvailable(row, column) {
    const thisSpace = "R" + row + "C" + column;
    let toModifySpacesAvailable = [...this.state.spacesAvailable];
    if (toModifySpacesAvailable.includes(thisSpace))
      return;
    else
      toModifySpacesAvailable.push(thisSpace);
    this.setState({
      spacesAvailable: toModifySpacesAvailable
    });
  }

  setSpaceBusy(row, column) {
    const thisSpace = "R" + row + "C" + column;
    let toModifySpacesAvailable = [...this.state.spacesAvailable];
    if (!toModifySpacesAvailable.includes(thisSpace))
      return;
    else
      toModifySpacesAvailable.splice(toModifySpacesAvailable.indexOf(thisSpace), 1);
    this.setState({
      spacesAvailable: toModifySpacesAvailable
    });
  }

  changeRobotGridStaticLocation(newColumn, newRow) {
    this.setState({
      robotGridStaticLocation: { column: newColumn, row: newRow }
    });
  }

  sendToastNotification = (message) => {
    const toastTemplate = (
      <Toast
        key={this.state.toasts.length + 1}
        onClose={() => this.closeOldestNotification()}
        show={true}
        delay={3000}
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

  closeOldestNotification() {
    var newToasts = this.state.toasts;
    newToasts.shift();
    this.setState({
      toasts: newToasts
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
      let commands = await plan(generateProblem(null, null, null, null, null));
      if (commands !== -1) {
        this.setState({
          spacesAvailable: this.initialSpacesAvailable,
          robotCommands: processCommands(commands, this.state.robotGridStaticLocation),
          simulationOn: true,
          alreadyActivated: false
        }, () => { this.setState({ alreadyActivated: true }) });
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

  componentDidMount() {
    this.sendToastNotification("A new car has arrived at hub R4C0!");
    this.sendToastNotification("A car is now awaiting delivery at hub R2C3!");
    this.sendToastNotification("A new car has arrived at hub R4C0!");
    this.sendToastNotification("A new obstacle was detected!");
    this.sendToastNotification("A new obstacle was detected!");
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
                onClick={() => { this.toggleDebugMode() }}
              >Debug Mode
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => { this.toggleSimulation(true) }}
              >Toggle Simulation
              </NavDropdown.Item>
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
                      resizable={this.state.resizableCanvas}
                      alreadyActivated={this.state.alreadyActivated}
                      setSpaceAvailable={this.setSpaceAvailable}
                      setSpaceBusy={this.setSpaceBusy}
                      toggleSimulation={this.toggleSimulation}
                      changeRobotGridStaticLocation={this.changeRobotGridStaticLocation}
                      simulationOn={this.state.simulationOn}
                      gridSize={this.state.gridSize}
                      robotGridStaticLocation={this.state.robotGridStaticLocation}
                      robotPath={this.state.robotCommands}
                      debugMode={this.state.debugMode}
                      spacesAvailable={this.state.spacesAvailable}
                    />
                  </Col>
                  <Col xs={4}>
                    <div
                      aria-live="polite"
                      aria-atomic="true"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 20
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
