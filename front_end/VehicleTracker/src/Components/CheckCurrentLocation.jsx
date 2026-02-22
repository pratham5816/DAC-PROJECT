import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import "../css/CheckCurrentLocation.css";

const CheckCurrentLocation = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckLocation = async () => {
    if (!vehicleNumber) {
      setError("Vehicle number is required");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await axios.get(
        "https://dac-project-production-d60f.up.railway.app/drive/getCurrentCheckpointLocation",
        {
          params: {
            vehicleNumber: vehicleNumber,
          },
        },
      );

      // backend response: { location: "PUNE" }
      setResult(res.data.location || "Not in checkpoint area");
    } catch (err) {
      console.error("Error fetching checkpoint location:", err);
      setError("Unable to fetch location");
      setResult("Not in checkpoint area");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="check-location-wrapper">
      <Card className="check-location-card shadow-lg p-4">
        <h5 className="text-center mb-3">
          📍 Check Current Checkpoint Location
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Vehicle Number */}
        <Form.Group className="mb-3">
          <Form.Label>Enter Vehicle Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="MH12AB1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">

          {loading && <strong>Checking...</strong>}

          {!loading && result && <strong>{result}</strong>}
        </Form.Group>

        <Button
          varient="none"
          className="checkLocation-btn w-100"
          onClick={handleCheckLocation}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" /> Checking...
            </>
          ) : (
            "Check Location"
          )}
        </Button>
      </Card>
    </div>
  );
};

export default CheckCurrentLocation;
