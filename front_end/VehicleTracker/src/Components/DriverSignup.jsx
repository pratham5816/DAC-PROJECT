import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form, Button } from "react-bootstrap";

function DriverSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    driverName: "",
    email: "",
    password: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/driver/register", form);
      alert("Driver registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 409) {
        alert("This email is already registered. Please login.");
      } else {
        alert("Signup failed. Try again.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="LicenseNumber"
          type="text"
          placeholder="License Number"
          required
          onChange={handleChange}
        />
      </Form.Group>

      <Button
        type="submit"
        className="w-100"
        style={{
          background: "linear-gradient(90deg, #6f42c1, #6610f2)",
          border: "none",
        }}
      >
        Sign Up as Driver
      </Button>
    </Form>
  );
}

export default DriverSignup;
