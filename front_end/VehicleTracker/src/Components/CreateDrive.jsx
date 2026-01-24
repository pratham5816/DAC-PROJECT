import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import './CreateDrive.css'

const CreateDrive = () => {
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    email: "",
    license: "",
    status:"",
  });

  const [vehicleNumber, setVehicleNumber] = useState("");
  //const [checkpoints, setCheckpoints] = useState([""]);
  const [finalPoint, setFinalPoint] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDriverChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

//   const handleCheckpointChange = (index, value) => {
//     const updated = [...checkpoints];
//     updated[index] = value;
//     setCheckpoints(updated);
//   };

//   const addCheckpoint = () => {
//     setCheckpoints([...checkpoints, ""]);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vehicleNumber || !driver.name || !finalPoint) {
      setError("Please fill all required fields");
      return;
    }

    try {
      // 1️⃣ Create Driver
      const driverRes = await axios.post(
        "http://localhost:8080/driver/create",
        driver
      );

      const driverId = driverRes.data.id;

      // 2️⃣ Create Ride / Route
      await axios.post("http://localhost:8080/ride/create", {
        vehicleNumber,
        driverId,
        //checkpoints,
        finalPoint,
        userId: 1, // logged-in user
      });

      setSuccess("Ride created successfully!");
    } catch {
      setError("Failed to create ride");
    }
  };

  return (
   
   <div className="create-drive-wrapper">
    <Card className="create-drive-card shadow-lg p-4">
      <h4 className="text-center mb-3">🚚 Create Drive</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Form onSubmit={handleSubmit}>
        {/* Vehicle */}
        <h6>🚗 Vehicle Details</h6>
        <Form.Control
          className="mb-3"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        {/* Driver */}
        <h6>👤 Driver Details</h6>
        <Row className="g-2">
          <Col xs={12} md={6}>
            <Form.Control
              placeholder="Driver Name"
              name="name"
              onChange={handleDriverChange}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Control
              placeholder="Phone"
              name="phone"
              onChange={handleDriverChange}
            />
          </Col>
        </Row>

        <Form.Control
          className="my-2"
          placeholder="Email"
          name="email"
          onChange={handleDriverChange}
        />

        <Form.Control
          className="mb-2"
          placeholder="License Number"
          name="license"
          onChange={handleDriverChange}
        />

        <Form.Control
          className="mb-3"
          placeholder="Status (Active / Inactive)"
          name="status"
          onChange={handleDriverChange}
        />

        {/* Route */}
        <h6>📍 Route Details</h6>
        <Form.Control
          className="mb-2"
          placeholder="Start Destination"
          value={finalPoint}
          onChange={(e) => setFinalPoint(e.target.value)}
        />

        <Form.Control
          className="mb-3"
          placeholder="Final Destination"
          value={finalPoint}
          onChange={(e) => setFinalPoint(e.target.value)}
        />

        <Button type="submit" className="w-100">
          Create Ride
        </Button>
      </Form>
    </Card>
  </div>
  );
};

export default CreateDrive;
