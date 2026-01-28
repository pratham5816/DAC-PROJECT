import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function DriverSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    driverName: "",
    email: "",
    password: "",
    licenseNumber: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "https://dac-project-production.up.railway.app/driver/register",
        form
      );

      setSuccess(true); // ✅ show success UI
    } catch (err) {
      if (err.response?.status === 409) {
        setError("This email is already registered. Please login.");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <>
      {/* ❌ Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Success */}
      {success ? (
        <Alert variant="success" className="text-center">
          <h6 className="mb-3">✅ Registration successful!</h6>
          <p>Please login to continue.</p>

          <Button
            className="w-100"
            variant="primary"
            onClick={() => navigate("/")}
          >
            🔐 Go to Login
          </Button>
        </Alert>
      ) : (
        /* 📝 Signup Form */
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              name="driverName"
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
              name="licenseNumber"
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
      )}
    </>
  );
}

export default DriverSignup;
