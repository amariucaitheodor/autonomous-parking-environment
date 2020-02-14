import React from 'react';
import Canvas from './Canvas';
import Overhead from './cameras/Overhead';
import Onboard from './cameras/Onboard';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Toast } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import GridSettings from './GridSettings';
import { GoGear } from 'react-icons/go';
import plan from '../actions/plan';
import generatePath from '../actions/generatePath';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: ["R0C1", "R1C1", "R0C3", "R1C3", "R2C0", "R3C0"],
      robotLocation: { x: 0, y: 4 }, // x is column and y row  for now
      robotPath: [{ i: 0, j: 4 }, { i: 2, j: 4 }, { i: 2, j: 3 }, { i: 2, j: 3 }, { i: 2, j: 2 }, { i: 2, j: 1 }, { i: 3, j: 1 }],
      debugMode: false,
      gridSize: { x: 5, y: 4 },
      settingsOn: false,
      showAlert: false
    };
    this.toggleSettings = this.toggleSettings.bind(this);
    this.changeGridSize = this.changeGridSize.bind(this);
  }

  toggleSpaceAvailable(spaceIndex) {
    let toModifySpacesAvailable = [...this.state.spacesAvailable];
    toModifySpacesAvailable[spaceIndex] = !toModifySpacesAvailable[spaceIndex];
    this.setState({
      spacesAvailable: toModifySpacesAvailable
    });
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
    this.setState({
      gridSize: { x: x, y: y }
    });
  }

  async replan() {
    let steps = await plan();
    if (steps !== -1) {
      this.setState({ robotPath: generatePath(steps, this.state.robotLocation) })
    }
  }

  componentDidMount() {
    // testing only
    // this.replan();
    this.setState({ showAlert: true })
  }

  render() {
    return (
      <Router>
        <Navbar bg="primary" variant="dark" sticky="top" >
          <Navbar.Brand>Finitech Operations Monitor</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Parking Lot" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/">View</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => { this.toggleDebugMode() }}
              >Debug Mode</NavDropdown.Item>
              {/* <NavDropdown.Item
                onClick={() => { this.toggleSettings() }}
              >Debug Settings</NavDropdown.Item> */}
            </NavDropdown>
            <NavDropdown title="Cameras" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/overhead">CCTV</NavDropdown.Item>
              <NavDropdown.Item href="#/onboard">Onboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>


        <Switch>
          <Route path="/overhead">
            <Overhead />
          </Route>
          <Route path="/onboard">
            <Onboard />
          </Route>
          <Route path="/">
            <div className="App">
              <GridSettings
                changeGridSize={this.changeGridSize}
                toggleSettings={this.toggleSettings}
                show={this.state.settingsOn}
              />
              <Canvas
                gridSize={this.state.gridSize}
                robotLocation={this.state.robotLocation}
                robotPath={this.state.robotPath}
                debugMode={this.state.debugMode}
                spacesAvailable={this.state.spacesAvailable}
              />
              <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                  position: 'absolute',
                  width: 300,
                  bottom: 30,
                  right: 30,
                }}
              >
                <Toast onClose={() => this.setState({ showAlert: false })} show={this.state.showAlert} delay={5000} autohide>
                  <Toast.Header>
                    <GoGear />
                    <strong className="mr-auto ml-2">Replanning...</strong>
                    just now
                  </Toast.Header>
                  <Toast.Body>
                    <h6 style={{ color: "rgb(70, 70, 70)" }}>A new car has arrived! </h6>
                  </Toast.Body>
                </Toast>
              </div>
            </div>
          </Route>
        </Switch>
      </Router >
    );
  }
}

export default App;
