import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../css/CreateDrive.css";
import Checkpoint from "./Checkpoint";

const CreateDrive = () => {
  const [driverEmail, setDriverEmail] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [finalPoint, setFinalPoint] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vehicleNumber || !driverEmail || !startPoint || !finalPoint) {
      setError("Please fill all required fields");
      return;
    }

    const userId = localStorage.getItem("personId");

    if (!userId) {
      setError("User not logged in");
      return;
    }

    setLoading(true);

    try {
      // 🔹 1. Get driverId by driver email
      const driverRes = await axios.post(
        "https://dac-project-production.up.railway.app/driver/getDriverByEmail",
        { email: driverEmail }
      );

      const driverId = driverRes.data?.driverId;

      if (!driverId) {
        throw new Error("Driver not found");
      }

      // 🔹 2. Create drive
      await axios.post(
        "https://dac-project-production.up.railway.app/drive/createDrive",
        {
          vehicleNumber,
          driverId,
          userId: Number(userId),
          startpointId: Number(startPoint),
          endpointId: Number(finalPoint),
          latitude: 0,
          longitude: 0,
        }
      );

      setSuccess("✅ Drive created successfully!");
      setVehicleNumber("");
      setDriverEmail("");
      setStartPoint("");
      setFinalPoint("");
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Something went wrong");
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
          {/* 🚗 Vehicle */}
          <h6>🚗 Vehicle Details</h6>
          <Form.Control
            className="mb-3"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />

          {/* 👤 Driver */}
          <h6>👤 Driver Details</h6>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                placeholder="Driver Email"
                value={driverEmail}
                onChange={(e) => setDriverEmail(e.target.value)}
              />
            </Col>
          </Row>

          {/* 📍 Route */}
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
            {loading ? "Creating..." : "Create Drive"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateDrive;
