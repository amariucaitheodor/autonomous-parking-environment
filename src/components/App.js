import React from 'react';
import ParkingGroup from './ParkingGroup';
import './App.css';
import { Stage, Layer, Shape } from "react-konva";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spacesAvailable: new Array(16).fill(true) };
    // this.handleClick = this.handleClick.bind(this);
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

  Home() {
    return <div className="App" >
      <header className="App-header">
        <h3> {new Date().toLocaleString()} </h3>
        <Stage width={1900} height={800}>
          <Layer>
            <Shape
              x={200}
              y={10}
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(275, 0);
                context.lineTo(275, 275);
                context.lineTo(0, 275);
                context.lineTo(0, 730);
                context.lineTo(1500, 730);
                context.lineTo(1500, 0);
                context.closePath();
                // (!) Konva specific method, it is very important
                context.fillStrokeShape(shape);
              }}
              fill={"white"}
              stroke={"black"}
              strokeWidth={5}
            />
            <ParkingGroup
              columns={5}
              horizontal={true}
              offset={{ x: 475, y: 10 }}
              spaces={this.state.spacesAvailable}
              slice={[0, 10]}
            />
            <ParkingGroup
              columns={2}
              horizontal={false}
              offset={{ x: 200, y: 285 }}
              spaces={this.state.spacesAvailable}
              slice={[10, 17]}
            />
          </Layer>
        </Stage>
      </header>
    </div>
  }

  Cameras() {
    return <div className="App" >
      <header className="App-header">
        <h3> Live stream from all cameras to be placed here </h3>
      </header>
    </div>
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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/cameras">
            {this.Cameras()}
          </Route>
          <Route path="/">
            {this.Home()}
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
