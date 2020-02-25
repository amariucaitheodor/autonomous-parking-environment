import React from "react";


class Overhead extends React.Component {
    constructor() {
        super();
        this.state = { time: new Date().toLocaleString() };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: new Date().toLocaleString() }), 300);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div
                className="pt-3"
                style={{
                    height: "94vh", // relative to the height of the viewport
                    backgroundColor: "#282c34",
                    textAlign: "center",
                    color: "white"
                }}
            >
                <header className="App-header">
                    <h3 className="mb-3"> {this.state.time} UTC </h3>
                </header>
                <iframe
                    title="cctv"
                    src="http://127.0.0.1:8081/stream.ogg"
                    width={window.innerHeight}
                    height={window.innerHeight * 0.8}
                />
            </div>
        );
    }
}

export default Overhead;
