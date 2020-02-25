import React from "react";
import { Toast } from "react-bootstrap";
import { GoGear } from 'react-icons/go';

class Overhead extends React.Component {
    constructor() {
        super();
        this.state = {
            toasts: [],
        };
    }

    sendToastNotification = (message) => {
        const toastTemplate = (
            <Toast
                key={this.state.toasts.length + 1}
                onClose={() => this.closeOldestNotification()}
                show={true}
                delay={3000}
                autohide
            >
                <Toast.Header>
                    <GoGear />
                    <strong className="mr-auto ml-2">Replanning...</strong>
                    just now
          </Toast.Header>
                <Toast.Body>
                    <h6 style={{ color: "rgb(70, 70, 70)" }}>{message}</h6>
                </Toast.Body>
            </Toast>
        );

        var newToasts = this.state.toasts;
        newToasts.push(toastTemplate)
        this.setState({
            toasts: newToasts
        });
    }

    closeOldestNotification() {
        var newToasts = this.state.toasts;
        newToasts.shift();
        this.setState({
            toasts: newToasts
        });
    }

    componentDidMount() {
      this.sendToastNotification("A new car has arrived at hub R4C0!");
      this.sendToastNotification("A car is now awaiting delivery at hub R2C3!");
      this.sendToastNotification("A new car has arrived at hub R4C0!");
      this.sendToastNotification("A new obstacle was detected!");
      this.sendToastNotification("A new obstacle was detected!");
    }

    render() {
        return (
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 20
                }}
            >
                {this.state.toasts}
            </div>
        );
    }
}

export default Overhead;
