import React, { useEffect, useState } from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import "./DriverPage.css";

const DriverPage = () => {

  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    driveAssigned: false,
    vehicle: null,
    location: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/driver/current")
      .then(res => {
        setDriver(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="driver-pro-wrapper">
      <Container className="driver-pro-container">

        {/* ===== PROFILE CARD ===== */}
        <div className="driver-profile">
          <div className="avatar">👤</div>

          <div className="profile-info">
            <h5>
              {driver.name || "Driver Name"}
            </h5>

            <span>
              📞 {driver.phone || "Mobile Number"}
            </span>
          </div>

          <Badge className={`status-badge ${driver.driveAssigned ? "active" : ""}`}>
            {driver.driveAssigned ? "Drive Active" : "No Drive Assigned"}
          </Badge>
        </div>

        {/* ===== VEHICLE INFO ===== */}
        <Card className="info-card">
          <h6>🚚 Vehicle Information</h6>

          {driver.driveAssigned && driver.vehicle ? (
            <>
              <div className="info-row">
                <span>Number</span>
                <strong>{driver.vehicle.number}</strong>
              </div>
              <div className="info-row">
                <span>Type</span>
                <strong>{driver.vehicle.type}</strong>
              </div>
              <div className="info-row">
                <span>Owner</span>
                <strong>{driver.vehicle.owner}</strong>
              </div>
            </>
          ) : (
            <p className="placeholder-text">
              Vehicle will appear once drive is assigned
            </p>
          )}
        </Card>

        {/* ===== LOCATION ===== */}
        <Card className="info-card">
          <h6>📍 Live Location</h6>

          <p className="location-text">
            {driver.location || "Location not available"}
          </p>

          <Button
            className="update-btn w-100 mb-2"
            disabled={!driver.driveAssigned}
          >
            🔄 Update Location
          </Button>

          <Button
            className="end-btn w-100"
            disabled={!driver.driveAssigned}
          >
            ⛔ End Drive
          </Button>
        </Card>

      </Container>
    </div>
  );
};

export default DriverPage;
