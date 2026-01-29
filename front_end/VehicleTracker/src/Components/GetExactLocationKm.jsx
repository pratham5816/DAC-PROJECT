
import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../css/CheckCurrentLocation.css";

const GetExactLocation = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetLocation = async () => {
    if (!vehicleNumber) {
      setError("Vehicle number is required");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      console.log("Fetching exact location for vehicle:", vehicleNumber);
      const res = await axios.get(
        `https://dac-project-production.up.railway.app/matrix/details/${vehicleNumber}`,
        {
          params: { vehicleNumber },
        }
      );

      setData(res.data);
    } catch (err) {
      console.error("Error fetching exact location:", err);
      setError("Unable to fetch exact location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="check-location-card shadow-lg p-4">
      <h5 className="text-center mb-3">📍 Get Exact Location Details</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Vehicle Number Input */}
      <Form.Group className="mb-3">
        <Form.Label>Vehicle Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="MH12AB1234"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />
      </Form.Group>

      {/* Result Section */}
      {data && (
        <div className="location-result mb-3">
          <p>
            <strong>Nearest Checkpoint:</strong>{" "}
            {data.nearestCp}
          </p>

          <p>
            <strong>Distance from Nearest CP:</strong>{" "}
            {data.distanceFromNearCP} ({data.timeFromNearCP})
          </p>

          <p>
            <strong>Final Checkpoint:</strong>{" "}
            {data.finalCp}
          </p>

          <p>
            <strong>Distance from Final CP:</strong>{" "}
            {data.distanceFromFinalCP} ({data.timeFromFinalCP})
          </p>

          {data.recentUpdatedMapUrl && (
            <a
              href={data.recentUpdatedMapUrl}
              target="_blank"
              rel="noreferrer"
              className="google-maps d-block mt-2"
              style={{ color: "black" }} 
            >
              📍 Open in Google Maps
            </a>
          )}
        </div>
      )}

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

