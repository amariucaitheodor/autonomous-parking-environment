import React from "react";

class DateTime extends React.Component {
    constructor() {
      super();
      this.state = { time: new Date().toLocaleString() };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: new Date().toLocaleString() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <h3> {this.state.time} </h3>);
    }
}

export default DateTime;
