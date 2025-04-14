// MapModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import RideMap from "./RideMap";

const MapModal = ({ show, onHide, pickup, destination }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Route Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RideMap pickup={pickup} destination={destination} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MapModal;
