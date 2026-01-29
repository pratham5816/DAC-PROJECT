import React, { useEffect, useState } from "react";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";
import axios from "axios";
import "../css/DriverPage.css";
import CheckCurrentLocation from "../Components/CheckCurrentLocation.jsx";
import GetExactLocation from "../Components/GetExactLocationKm.jsx";



const DriverPage = () => {
  
  const [driver, setDriver] = useState({
    name: "Name not found",
    lisenceNumber: "lisence not found",
    email: "Email not found",
    // phone: "Number Not Found",
    driveAssigned: false,
    vehicle: null,
    location: "",
  });

  const [checkpointLocation, setCheckpointLocation] = useState("");

  const [loading, setLoading] = useState(true);

  const [updatingLocation, setUpdatingLocation] = useState(false);

  const [locationVersion, setLocationVersion] = useState(0);

  const ResponseObj = JSON.parse(localStorage.getItem("loginResponseObj")); // getting data entered at login

  //Fetch driver + drive info


  useEffect(() => {
    axios
      .post("https://dac-project-production.up.railway.app/driver/getDriverByEmail", {
        email: localStorage.getItem("Email"),
      })
      .then((res) => {
        const data = res.data;
        //console.log(data.driverName); // pappu
        setDriver((prev) => ({
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
      .post("https://dac-project-production.up.railway.app/drive/checkDriverAssigned", {
        email: ResponseObj.email,
      })
      .then((res) => {
        const data = res.data;
        console.log("Drive data: ", data);
        

        setDriver((prev) => ({
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
    if (!driver.driveAssigned || !driver.vehicle) return;
    axios
      .get("https://dac-project-production.up.railway.app/drive/getCurrentCheckpointLocation", {
        params: {
          vehicleNumber: driver.vehicle.number,
           
        },
      })
      .then((res) => {
        setCheckpointLocation(res.data.location || "Not in checkpoint area");
      })
      .catch((err) => {
        console.error("Error fetching current checkpoint location: " + err);
      });
  }, [driver.driveAssigned, driver.vehicle, locationVersion]);

  // Update location logic
  const updateLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    if (!driver.vehicle?.number) {
      alert("Vehicle not assigned");
      return;
    }

    setUpdatingLocation(true);

    

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        axios
          .post("https://dac-project-production.up.railway.app/drive/updateLocation", {
            vehicleNumber: driver.vehicle.number,
            latitude,
            longitude,
          })
          .then(() => {
            setDriver((prev) => ({
              ...prev,
              location: `${latitude}, ${longitude}`,
            }));
            

            setLocationVersion((prev) => prev + 1);
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

 const endDrive = () => {
  if (!driver.driveAssigned || !driver.vehicle) {
    alert("No active drive to end.");
    return;
  }

  if (!window.confirm("Are you sure you want to end the drive?")) return;

  axios
    .post("https://dac-project-production.up.railway.app/drive/endDrive", {
      vehicleNumber: driver.vehicle.number, 
    })
    .then(() => {
      alert("Drive ended successfully.");
      setDriver((prev) => ({
        ...prev,
        driveAssigned: false,
        vehicle: null,
        location: "",
      }));
    })
    .catch((err) => {
      console.error("Error ending drive:", err);
      alert("Failed to end drive. Please try again.");
    });
};


  return (
    <div className="driver-pro-wrapper">
      <Container className="driver-pro-container">
        {/* ===== PROFILE CARD ===== */}
        <div className="driver-profile">
          <div className="avatar">👤</div>

          <div className="profile-info">
            <div> <span>{"Name:  " + driver.name}</span></div>
           <div> <span>{"Lisence Number:  " + driver.lisenceNumber}</span></div>
            <div><span>{"Driver Email:  " + driver.email}</span></div>
            
           {/* <div> <span>📞 {driver.phone}</span></div> */}
          </div>

          <Badge
            className={`status-badge ${driver.driveAssigned ? "active" : ""}`}
          >
            {driver.driveAssigned ? "Drive Active" : "No Drive Assigned"}
          </Badge>
        </div>

        {/* VEHICLE INFO*/}
        <Card className="info-card">
          <h6>🚚 Vehicle Information</h6>

          {driver.driveAssigned && driver.vehicle ? (
            <>
              <div className="info-row">
                <span>Number</span>
                <strong>{driver.vehicle.number.toUpperCase()}</strong>
              </div>
              <div className="info-row">
                <span>Type</span>
                <strong>{driver.vehicle.type}</strong>
              </div>
              <div className="info-row">
                <span>Owner</span>
                <strong>{driver.vehicle.owner}</strong>
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

        {/*LOCATION*/}
        <Card className="info-card">
          <h6>📍 Live Location</h6>

          <p className="location-text">{driver.location}</p>

          <Button
            className="update-btn w-100 mb-2"
            disabled={!driver.driveAssigned || updatingLocation}
            onClick={updateLocation}
          >
            {updatingLocation ? "Updating..." : "🔄 Update Location"}
          </Button>

          <Button className="end-btn w-100" disabled={!driver.driveAssigned}
          onClick={endDrive}>
            ⛔ End Drive
          </Button>

          {driver.driveAssigned && driver.vehicle && (
            <>
             <CheckCurrentLocation vehicleNumber={driver.vehicle.number} />
            <GetExactLocation vehicleNumber={driver.vehicle.number} />
            </>
           
            )}
        </Card>
      </Container>
    </div>
  );
};

export default DriverPage;
