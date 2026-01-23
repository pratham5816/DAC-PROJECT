import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";



const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    vehicleNumber: "",
    vehicleType: "",
    challanExp: 0,
    vehicleExp: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!vehicle.vehicleNumber || !vehicle.vehicleType) {
      setError("Vehicle Number and Type are required");
      return;
    }

    const userEmail = localStorage.getItem("email");
    console.log("User Email: "+userEmail);

    try {

      console.log("Vehicle Number: " + vehicle.vehicleNumber)
        const userEmail = localStorage.getItem("Email");
         console.log("User Email: "+userEmail);

      
      
      const response = await axios.post("http://localhost:8080/User/getUserIDbyEmail",{
        email:userEmail
      });

      const userIdfromApi = parseInt(response.data);




      await axios.post("http://localhost:8080/Vehicle/addVehicle", {
        vehicleNumber: vehicle.vehicleNumber,
        vehicleType: vehicle.vehicleType,
        challan_Exp: vehicle.challanExp,
        vehicle_Exp: vehicle.vehicleExp,
        userId: userIdfromApi   // auto-filled from logged-in user
      });

      setSuccess("Vehicle registered successfully!");
      setVehicle({
        vehicleNumber: "",
        vehicleType: "",
        challanExp: 0,
        vehicleExp: 0,
      });
    } catch (err) {
      console.log(err);
      if(err.response && err.response.data){
        setError(err.response.data);
      }else{
        setError("Failed to add vehicle");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4" style={{ width: "420px" }}>
        <h4 className="text-center mb-3">🚗 Add Vehicle</h4>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="MH12AB1234"
              name="vehicleNumber"
              value={vehicle.vehicleNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select
              name="vehicleType"
              value={vehicle.vehicleType}
              onChange={handleChange}
            >
              <option value="">Select Vehicle Type</option>
              <option>Truck</option>
              <option>Van</option>
              <option>Trailer</option>
              <option>Crane</option>
              <option>JCB</option>
              <option>Fuel Tanker</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Challan Expenditure (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 30"
              name="challanExp"
              value={vehicle.challanExp}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vehicle Expenditure (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="e.g. 365"
              name="vehicleExp"
              value={vehicle.vehicleExp}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Add Vehicle
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddVehicle;

