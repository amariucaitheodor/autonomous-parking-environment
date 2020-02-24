import React from "react";


class Overhead extends React.Component {
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
                <video
                    controls
                    autoPlay
                    width={window.innerWidth * 0.9}
                    height={window.innerHeight * 0.8}
                >
                    <source
                        src="http://129.215.124.4:8081/stream.ogg"
                        type="video/ogg"
                    />
                    Sorry, your browser doesn't support embedded videos.
                </video>
            </div>
        );
    }
}

export default Overhead;
