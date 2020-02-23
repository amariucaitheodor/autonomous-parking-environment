import React from "react";

function Overhead() {
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
                <h3 className="mb-3"> CCTV camera </h3>
            </header>
            <video controls width="1200" height="600">
                <source src="http://localhost:8081/stream.ogg"
                    type="video/webm" />

                <source src="http://localhost:8081/stream.ogg"
                    type="video/mp4" />

                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
    );
}

export default Overhead;
