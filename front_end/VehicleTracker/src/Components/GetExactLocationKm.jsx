import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../css/CheckCurrentLocation.css";


const GetExactLocation = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [result, setResult] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetLocation = async () => {
    if (!vehicleNumber) {
      setError("Vehicle number is required");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setMapUrl("");

    try {
      const res = await axios.get(
        "https://dac-project-production.up.railway.app/drive/getExactLocationInKms",
        {
          params: { vehicleNumber },
        }
      );

      setResult(`${res.data.distanceKm} km`);
      setMapUrl(res.data.mapUrl);
    } catch (err) {
        console.error("Error fetching exact location:", err);
      setError("Unable to fetch exact location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="check-location-card shadow-lg p-4">
      <h5 className="text-center mb-3">
        📍 Get Exact Location In Kms
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Group className="mb-3">
        <Form.Label>Vehicle Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="MH12AB1234"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Result</Form.Label>
        <Form.Control value={result} disabled />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Map URL</Form.Label>
        <Form.Control value={mapUrl} disabled />
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="d-block mt-1"
          >
            📍 Open in Google Maps
          </a>
        )}
      </Form.Group>

      <Button
        className="checkLocation-btn w-100"
        onClick={handleGetLocation}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Get Location"}
      </Button>
    </Card>
  );
};

export default GetExactLocation;
