import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function UserSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://dac-project-production.up.railway.app/user/register", form);
      alert("User registered successfully");
    } catch {
      alert("Signup failed");
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

      <Button
        type="submit"
        className="w-100"
        style={{
          background: "linear-gradient(90deg, #6f42c1, #6610f2)",
          border: "none"
        }}
      >
        Sign Up as User
      </Button>
    </Form>
  );
}

export default UserSignup;
