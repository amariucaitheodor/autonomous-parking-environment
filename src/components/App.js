import React from 'react';
import ParkingLot from './parking/ParkingLot';
import PddlLegend from './pddl/PddlLegend';
import Cameras from './Cameras';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      spacesAvailable: new Array(25).fill(true),
      debugMode: false
    };
  }

  stringColors = {
    green: "rgba(103, 233, 98, 0.22)",
    red: "rgba(228, 27, 65, 0.22)",
    blue: "rgba(34, 81, 221, 0.22)",
    orange: "rgba(236, 140, 19, 0.22)",
    black: "rgba(50, 50, 50, 0.22)",
    purple: "rgba(94, 0, 255, 0.22)"
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
    this.toggleSpaceAvailable(4);
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
              <PddlLegend
                stringColors={this.stringColors}
              />
            </NavDropdown>
            <Nav.Link href="#/cameras">Cameras</Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/cameras">
            <Cameras />
          </Route>
          <Route path="/">
            <ParkingLot
              debugMode={this.state.debugMode}
              stringColors={this.stringColors}
              spacesAvailable={this.state.spacesAvailable}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
