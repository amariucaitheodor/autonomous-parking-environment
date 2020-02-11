import React from 'react';
import ParkingLot from './parking/ParkingLot';
import DebugLegend from './debug/DebugLegend';
import Overhead from './cameras/Overhead';
import Onboard from './cameras/Onboard';
import './App.css';
// import writeProblem from '../actions/writeProblem';
// import solveProblem from '../actions/solveProblem';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: new Array(8).fill(true),
      debugMode: false
    };
  }

  debugCellTypes = Object.freeze({
      "blockingSpace": "rgba(228, 27, 65, 0.2)", // red
      "road": "rgba(255, 255, 255, 0.2)", // white
      "availableParking": "rgba(103, 233, 98, 0.2)", // green
      "availableDropoff": "rgba(34, 81, 221, 0.2)", // blue
      "carAwaitingPickup": "rgba(236, 140, 19, 0.2)", // orange
      "carAwaitingOwner": "rgba(94, 0, 255, 0.2)", // purple
  })

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
          {/* <img
            src={window.location.origin + "/favicon.ico"}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Finitech logo"
          /> */}
          <Navbar.Brand>Finitech Operations Monitor</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Parking Lot" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#/">View</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => { this.toggleDebugMode() }}
              >Debug Mode</NavDropdown.Item>
              <DebugLegend
                debugCellTypes={this.debugCellTypes}
              />
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
            <ParkingLot
              debugMode={this.state.debugMode}
              debugCellTypes={this.debugCellTypes}
              spacesAvailable={this.state.spacesAvailable}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
