import React from "react";
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function GridSettings({ toggleSettings, show, changeGridSize }) {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Grid Settings
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={toggleSettings}>
            Close
          </Button>
                <Button onClick={() => {changeGridSize(4, 6)}}>Change Grid Dimensions</Button>
                {/* <Button onClick={onHide}>Enable Edit Mode</Button> */}
            </Modal.Footer>
        </Modal>
    );
}

GridSettings.propTypes = {
    toggleSettings: PropTypes.func.isRequired,
    changeGridSize: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default GridSettings;

