import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./CreateDrive.css";
//import AddCheckpoint from "./AddCheckpoint";
import Checkpoint from "./Checkpoint";

const CreateDrive = () => {
  const [driver, setDriver] = useState({
    email: "",
  });

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [finalPoint, setFinalPoint] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleDriverChange = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vehicleNumber || !finalPoint) {
      setError("Please fill all required fields");
      return;
    }

    try {
      console.log("Driver : ", driver.email);
      const driverRes = await axios.post(
        "http://localhost:8080/driver/getDriverByEmail",
        { email: driver.email },
      );
      console.log("Driver Response: ", driverRes.data);

      const driverId = driverRes.data.driverId;

      const ResponseApi = await axios.post(
        "http://localhost:8080/drive/createDrive",
        {
          vehicleNumber: vehicleNumber,
          driverId: driverId,
          startpointId: startPoint, // later add start point
          endpointId: finalPoint, // later add end point
          latitude: 0, // later add latitude
          longitude: 0, // later add longitude
          // logged-in user
        },
      );

      setSuccess("Ride created successfully!");
    } catch (error) {
      console.error("Error creating ride: " + error);
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
          <h6>🚗 Vehicle Details</h6>
          <Form.Control
            className="mb-3"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />

          <h6>👤 Driver Details</h6>
          <Row className="g-2">
            <Col xs={12} md={6}>
              {/* <Form.Control
                placeholder="Driver Name"
                name="name"
                onChange={handleDriverChange}
              /> */}
            </Col>
            <Col xs={12} md={6}>
              {/* <Form.Control
                placeholder="Phone"
                name="phone"
                onChange={handleDriverChange}
              /> */}
            </Col>
          </Row>

          <Form.Control
            className="my-2"
            placeholder="Email"
            name="email"
            onChange={handleDriverChange}
          />

          {/* <Form.Control
            className="mb-2"
            placeholder="License Number"
            name="license"
            onChange={handleDriverChange}
          /> */}

          {/* <Form.Control
            className="mb-3"
            placeholder="Status (Active / Inactive)"
            name="status"
            onChange={handleDriverChange}
          /> */}

          <h6>📍 Route Details</h6>
          <Form.Control
            className="mb-3"
            placeholder="Start Destination ID"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            placeholder="Final Destination ID"
            value={finalPoint}
            onChange={(e) => setFinalPoint(e.target.value)}
          />

          {/* 🔥 SEPARATE COMPONENT */}
          {/* <AddCheckpoint /> */}
          {/* <h6>📍 Route Details</h6> */}
          <Checkpoint />

          <Button type="submit" className="createRide-btn w-100 mt-3">
            Create Ride
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDrive;
