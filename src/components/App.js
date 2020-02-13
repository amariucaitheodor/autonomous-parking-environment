import React from 'react';
import Canvas from './Canvas';
import Overhead from './cameras/Overhead';
import Onboard from './cameras/Onboard';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: ["R0C1", "R1C1", "R0C3", "R1C3", "R2C0", "R3C0"],
      robotLocation: { x: 0, y: 5 }, // x is column and y row  for now
      robotPath: [{ i: 0, j: 5 }, { i: 2, j: 5 }, { i: 2, j: 4 }, { i: 2, j: 3 }, { i: 2, j: 2 }, { i: 2, j: 1 }, { i: 3, j: 1 }],
      debugMode: false
    };
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

  componentDidMount() {
    // this.toggleSpaceAvailable(4);
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
            <Canvas
              robotLocation={this.state.robotLocation}
              robotPath={this.state.robotPath}
              debugMode={this.state.debugMode}
              spacesAvailable={this.state.spacesAvailable}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
