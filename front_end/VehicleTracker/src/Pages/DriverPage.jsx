import React, { useEffect, useState } from "react";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import "./DriverPage.css";

const DriverPage = () => {
  // const [driver, setDriver] = useState({
  //   name: "",
  //   phone: "Number Not Found",
  //   driveAssigned: false,
  //   vehicle: null,
  //   location: "",
  // });

  const [driver2, setDriver2] = useState({
    name: "Name not found",
    lisenceNumber: "lisence not found",
    email: "Email not found",
    phone: "Number Not Found",
    driveAssigned: false,
    vehicle: null,
    location: "",
  });

  const [checkpointLocation, setCheckpointLocation] = useState("");

  const [loading, setLoading] = useState(true);

  const [updatingLocation, setUpdatingLocation] = useState(false);

  const ResponseObj = JSON.parse(localStorage.getItem("loginResponseObj")); // getting data entered at login

  // 🔹 Fetch driver + drive info
  useEffect(() => {
    axios
      .post("http://localhost:8080/driver/getDriverByEmail", {
        email: localStorage.getItem("Email"),
      })
      .then((res) => {
        const data = res.data;
        console.log(data.driverName); // pappu
        setDriver2((prev) => ({
          ...prev,
            name: data.driverName,
            lisenceNumber: data.licenseNumber,
            email: data.email,
        }));
      })
      .catch((err) => {
        console.error("Error fetching driver details: " + err);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8080/drive/checkDriverAssigned", {
        email: ResponseObj.email,
      })
      .then((res) => {
        const data = res.data;


        setDriver2((prev) => ({
          ...prev,
          driveAssigned: data.status === "ACTIVE",
          vehicle: data.vehicle
            ? {
                number: data.vehicle.vechicleNumber,
                type: data.vehicle.vehicleType,
                owner: data.vehicle.user?.name,
              }
            : null,
          location:
            data.latitude && data.longitude
              ? `${data.latitude}, ${data.longitude}`
              : "Location not available",
        }));

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/drive/getCurrentCheckpointLocation", {
        params: {
          vehicleNumber: "MP20CG8989",
        },
      })
      .then((res) => {
        setCheckpointLocation(res.data.location || "Not in checkpoint area");
      })
      .catch((err) => {
        console.error("Error fetching current checkpoint location: " + err);
      });
  }, []);

  // 🔹 Update location logic
  const updateLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    if (!driver2.vehicle?.number) {
      alert("Vehicle not assigned");
      return;
    }

    setUpdatingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        axios
          .post("http://localhost:8080/drive/updateLocation", {
            vehicleNumber: driver2.vehicle.number,
            latitude,
            longitude,
          })
          .then(() => {
            setDriver2((prev) => ({
              ...prev,
              location: `${latitude}, ${longitude}`,
            }));
            setUpdatingLocation(false);
          })
          .catch(() => {
            alert("Failed to update location");
            setUpdatingLocation(false);
          });
      },
      (error) => {
        alert("Location permission denied");
        console.error(error);
        setUpdatingLocation(false);
      },
      {
        enableHighAccuracy: true,
      },
    );
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="driver-pro-wrapper">
      <Container className="driver-pro-container">
        {/* ===== PROFILE CARD ===== */}
        <div className="driver-profile">
          <div className="avatar">👤</div>

          <div className="profile-info">
            <div> <span>{"Name:  " + driver2.name}</span></div>
           <div> <span>{"Lisence Number:  " + driver2.lisenceNumber}</span></div>
            <div><span>{"Driver Email:  " + driver2.email}</span></div>
            
           <div> <span>📞 {driver2.phone}</span></div>
          </div>

          <Badge
            className={`status-badge ${driver2.driveAssigned ? "active" : ""}`}
          >
            {driver2.driveAssigned ? "Drive Active" : "No Drive Assigned"}
          </Badge>
        </div>

        {/* ===== VEHICLE INFO ===== */}
        <Card className="info-card">
          <h6>🚚 Vehicle Information</h6>

          {driver2.driveAssigned && driver2.vehicle ? (
            <>
              <div className="info-row">
                <span>Number</span>
                <strong>{driver2.vehicle.number}</strong>
              </div>
              <div className="info-row">
                <span>Type</span>
                <strong>{driver2.vehicle.type}</strong>
              </div>
              <div className="info-row">
                <span>Owner</span>
                <strong>{driver2.vehicle.owner}</strong>
              </div>
              <div className="info-row">
                <span>Current Checkpoint</span>
                <strong>{checkpointLocation || "Not Found"}</strong>
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

          <p className="location-text">{driver2.location}</p>

          <Button
            className="update-btn w-100 mb-2"
            disabled={!driver2.driveAssigned || updatingLocation}
            onClick={updateLocation}
          >
            {updatingLocation ? "Updating..." : "🔄 Update Location"}
          </Button>

          <Button className="end-btn w-100" disabled={!driver2.driveAssigned}>
            ⛔ End Drive
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default DriverPage;
