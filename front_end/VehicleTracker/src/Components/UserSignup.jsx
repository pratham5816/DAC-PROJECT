import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

function UserSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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
        "https://dac-project-production-d60f.up.railway.app/user/register",
        form
      );

      setSuccess(true); // show success message
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
      {/*  Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/*  Success */}
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
        /* Signup Form */
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

          <Button
            type="submit"
            className="w-100"
            style={{
              background: "linear-gradient(90deg, #6f42c1, #6610f2)",
              border: "none",
            }}
          >
            Sign Up as User
          </Button>
        </Form>
      )}
    </>
  );
}

export default UserSignup;
