import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../css/CreateDrive.css";
import Checkpoint from "./Checkpoint";

const CreateDrive = () => {
  const [driver, setDriver] = useState({
    email: "",
    driverId: null,
  });

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [finalPoint, setFinalPoint] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDriverChange = (e) => {
    setDriver((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vehicleNumber || !finalPoint || !driver.email) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // 🔹 1. Get driver by email
      const driverRes = await axios.post(
        "http://localhost:8080/driver/getDriverByEmail",
        { email: driver.email }
      );

      const driverId = driverRes.data.driverId;

      // store driverId (optional, for later use)
      setDriver((prev) => ({
        ...prev,
        driverId,
      }));

      // 🔹 2. Create drive
      await axios.post("http://localhost:8080/drive/createDrive", {
        vehicleNumber,
        driverId,
        startpointId: startPoint,
        endpointId: finalPoint,
        latitude: 0,
        longitude: 0,
      });

      setSuccess("Ride created successfully!");
    } catch (err) {
      console.error("Error creating ride:", err);

      if (err.response) {
        setError(err.response.data.message || "Failed to create ride");
      } else {
        setError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-drive-wrapper">
      <Card className="create-drive-card shadow-lg p-4">
        <h4 className="text-center mb-3">🚚 Create Drive</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <Form onSubmit={handleSubmit}>
          {/* 🚗 Vehicle Details */}
          <h6>🚗 Vehicle Details</h6>
          <Form.Control
            className="mb-3"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />

          {/* 👤 Driver Details */}
          <h6>👤 Driver Details</h6>
          <Row className="g-2">
            <Col xs={12} md={12}>
              <Form.Control
                className="my-2"
                placeholder="Driver Email"
                name="email"
                value={driver.email}
                onChange={handleDriverChange}
              />
            </Col>
          </Row>

          {/* 📍 Route Details */}
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

          {/* 🔥 Checkpoints */}
          <Checkpoint />

          <Button
            type="submit"
            className="createRide-btn w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Ride"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDrive;
