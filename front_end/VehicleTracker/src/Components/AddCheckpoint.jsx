import React, { useState } from "react";
import { Form,Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../css/CheckpointForm.css";

const AddCheckpoint = () => {
  const [checkpoint, setCheckpoint] = useState({
    name: "",
    latitude: "",
    longitude: "",
    radiusKm: ""
  });

  const handleChange = (e) => {
    setCheckpoint({
      ...checkpoint,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCheckpoint = async () => {
    try {
      await axios.post("http://localhost:8080/checkpoint/addCheckpoint", {
        name: checkpoint.name,
        latitude: Number(checkpoint.latitude),
        longitude: Number(checkpoint.longitude),
        radiusKm: Number(checkpoint.radiusKm)
      });

      alert("Checkpoint added successfully!");

      setCheckpoint({
        name: "",
        latitude: "",
        longitude: "",
        radiusKm: ""
      });
    } catch (error) {
      alert("Failed to add checkpoint");
      console.error(error);
    }
  };

  return (
    <div className="checkpoint-section">
        <Card className="add-checkpoint-card shadow-lg p-4">
      <h6 className="checkpoint-title">📍 Add Checkpoint</h6>

      <Form.Control
        className="checkpoint-input mb-2"
        placeholder="Checkpoint Name (e.g. MUMBAI)"
        name="name"
        value={checkpoint.name}
        onChange={handleChange}
      />

      <Row className="g-2">
        <Col xs={12} md={4}>
          <Form.Control
            className="checkpoint-input"
            placeholder="Latitude"
            name="latitude"
            value={checkpoint.latitude}
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={4}>
          <Form.Control
            className="checkpoint-input"
            placeholder="Longitude"
            name="longitude"
            value={checkpoint.longitude}
            onChange={handleChange}
          />
        </Col>

        <Col xs={12} md={4}>
          <Form.Control
            className="checkpoint-input"
            placeholder="Radius (Km)"
            name="radiusKm"
            value={checkpoint.radiusKm}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <Button
        type="button"
        className="checkpoint-btn w-100 mt-3"
        onClick={handleAddCheckpoint}
      >
        ➕ Add Checkpoint
      </Button>
      </Card>
    </div>
  );
};

export default AddCheckpoint;
