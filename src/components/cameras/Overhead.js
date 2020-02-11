import React from "react";
import Webcam from "react-webcam";

function Cctv() {
    return (
        <div className="App" >
            <header className="App-header">
                <h3 className="mb-3"> CCTV camera </h3>
                <Webcam
                    audio={false}
                    
                    videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user" // { exact: "environment" } for facing-out camera
                    }} />
            </header>
        </div>
    );
}

export default Cctv;
