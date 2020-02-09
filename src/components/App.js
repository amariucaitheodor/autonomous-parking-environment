import React from 'react';
import ParkingLot from './ParkingLot';
import Cameras from './Cameras';
import './App.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spacesAvailable: new Array(16).fill(true) };
  }

  toggleSpaceAvailable(spaceIndex) {
    let toModifySpacesAvailable = [...this.state.spacesAvailable];
    toModifySpacesAvailable[spaceIndex] = !toModifySpacesAvailable[spaceIndex];
    this.setState({
      spacesAvailable: toModifySpacesAvailable
    });
  }

  componentDidMount() {
    this.toggleSpaceAvailable(4);
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000)
  }

  render() {
    return (
      <Router>
        <Navbar bg="primary" variant="dark">
          {/* <img
            src={window.location.origin + "/favicon.ico"}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Finitech logo"
          /> */}
          <Navbar.Brand>Finitech Operations Monitor</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#/">Parking Lot</Nav.Link>
            <Nav.Link href="#/cameras">Cameras</Nav.Link>
          </Nav>
        </Navbar>

        <Switch>
          <Route path="/cameras">
            <Cameras />
          </Route>
          <Route path="/">
            <ParkingLot 
            spacesAvailable={this.state.spacesAvailable}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
