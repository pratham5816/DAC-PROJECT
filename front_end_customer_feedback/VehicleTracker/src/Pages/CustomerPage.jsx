import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";import axios from "axios";
import "../css/CustomerPage.css"; 


const CustomerPage = () => {
  const navigate = useNavigate();

  // const location = useLocation();

  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [assignedVehicles, setAssignedVehicles] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const indianVehicleRegex = /^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/;

  const storedCustomerId = localStorage.getItem("customerId"); //watchout

useEffect(() => {
  if (!storedCustomerId) {
    navigate("/");
    return;
  }

  setCustomerId(storedCustomerId);

  // axios
  //   .get(`http://localhost:5173/api/customer/${storedCustomerId}`)
  //   .then((res) => {
  //     setCustomerName(res.data.name);
  //     setAssignedVehicles(res.data.vehicles || []);
  //     setError("");
  //   })
  //   .catch(() => {
  //     setError("Failed to load customer profile");
  //   });

  axios
  .get(`/api/customer/${storedCustomerId}`)
  .then((res) => {
    setCustomerName(res.data.data.name);
    setAssignedVehicles(res.data.data.vehicles || []);
    setError("");
  })
  .catch(() => {
    setError("Failed to load customer profile");
  });

}, [storedCustomerId, navigate]);

  //status checking
  const handleCheckStatus = () => {
    const enteredVehicle = vehicleNo.trim().toUpperCase();

    if (!enteredVehicle) {
      setError("Vehicle number is required");
      setShowStatus(false);
      return;
    }

    if (!indianVehicleRegex.test(enteredVehicle)) {
      setError("Enter valid vehicle number (MH05AB1234)");
      setShowStatus(false);
      return;
    }

    // axios
    //   .get(
    //     `https://localhost:5173/api/customer/${customerId}/vehicle-status/${enteredVehicle}`,
    //   )
    //   .then((res) => {
    //     setVehicleDetails(res.data);
    //     setError("");
    //     setShowStatus(true);
    //   })
    //   .catch(() => {
    //     setError("Vehicle not found or not assigned to you");
    //     setShowStatus(false);
    //   });

    axios
  .get(`/api/customer/${customerId}/vehicle-status/${enteredVehicle}`)
  .then((res) => {
    setVehicleDetails(res.data);
    setError("");
    setShowStatus(true);
  })
  .catch(() => {
    setError("Vehicle not found or not assigned to you");
    setShowStatus(false);
  });

  };

  // for feedback
  const handleFeedbackRedirect = () => {
    navigate("/feedback", {
      state: {
        customerId,
        rating,
      },
    });
  };

  return (
    <div className="customer-page-wrapper">
      <div className="customer-card">
        <h1 className="card-title">Welcome</h1>
        <h2 className="customer-name">{customerName}</h2>

        {/* Vehicle Status */}
        <div className="vehicle-box">
          <label>Enter Vehicle Number</label>
          <input
            type="text"
            placeholder="MH05AB1234"
            value={vehicleNo}
            onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
          />
          <button onClick={handleCheckStatus}>Check Status</button>
          <div className="error-slot">{error}</div>
        </div>

        {showStatus && vehicleDetails && (
          <div className="status-box">
            <p>
              <strong>Status:</strong> {vehicleDetails.status}
            </p>
            <p>
              <strong>Current Location:</strong> {vehicleDetails.location}
            </p>
          </div>
        )}

        {/* Rating */}
        <div className="rating-section">
          <p className="rating-label">Rate our service</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star filled" : "star"}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <button className="feedback-btn" onClick={handleFeedbackRedirect}>
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;
