import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Tab, Nav } from "react-bootstrap";
import axios from 'axios'

const LoginPage = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState("driver");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginResult, setLoginResult] = useState(null);



    // Regex patterns
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email validation

    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; 
    // min 6 chars, at least one letter and one number


 const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

      // Regex validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   setError("Password must be at least 6 characters, with at least one letter and one number.");
    //   return;
    // }


    if (!email || !password) {
      setError("Please enter email address and password");
      return;
    }
    
      console.log(email);
      console.log(password);

      localStorage.setItem("Email" , email)

      const loginApiMap = {
               driver: "http://localhost:8080/Auth/DriverLogin",
                user: "http://localhost:8080/Auth/UserLogin",
             customer: "http://localhost:8080/Auth/CustomerLogin",
               };


      const loginUrl = loginApiMap[activeTab];
    try {
          const response = await axios.post(
            loginUrl,
    {
      email: email,
      password: password
    },
    {
        headers: { "Content-Type": "application/json" }
      }

  );

 if(response.status == 200){console.log("YES")}

  if (response.status == 200) {
    setLoginResult(response.data);
    onLogin(activeTab, response.data.email); // ✅ correct
  } else {
    setError(response.data.message || "Login Failed");
  }
  } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
    }
  };

 const handleGoogleLogin = () => {
    setEmail(email);
    setPassword(password);
    onLogin(activeTab,email);
  };




  
  return (

    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Panel */}
        <Col
        
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-white text-center p-5"
          style={{
            background: "linear-gradient(135deg, #6f42c1, #6610f2)",
          }}
        >
          <h1 className="fw-bold mb-3"> VehicleTracker </h1>
      
          <p className="lead text-center mb-2"  style={{ fontSize: "15px" }}>
            Browser-based GPS tracking without hardware costs
          </p>
          <div className="d-flex gap-5 mt-5 text-center">
            <div>
              <h3>500+</h3>
              <small>Active Vehicles</small>
            </div>
            <div>
              <h3>99.9%</h3>
              <small>Uptime</small>
            </div>
            <div>
              <h3>24/7</h3>
              <small>Support</small>
            </div>
          </div>
          
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center  p-5"
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="fw-semibold mb-2">Welcome Back!</h2>
            <p className="text-muted mb-4">Sign in to access your dashboard</p>


             <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      {/* Tab Buttons */}
      <Nav variant="tabs" className="mb-3 justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="driver" className="d-flex align-items-center gap-2">
            <i className="bi bi-truck"></i>
            Driver
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="user" className="d-flex align-items-center gap-2">
            <i className="bi bi-person"></i>
            User
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="customer" className="d-flex align-items-center gap-2">
            <i className="bi bi-people"></i>
            Customer
          </Nav.Link>
        </Nav.Item>
      </Nav>

      


      <Tab.Content>
        {["driver", "user", "customer"].map((role) => (
          <Tab.Pane eventKey={role} key={role}>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId={`${role}Email`}>
                
                <Form.Control
                  type="text"
                  placeholder={`${role.charAt(0).toUpperCase() + role.slice(1)} Email`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={`${role}Password`}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#" className="text-primary">Forgot password?</a>
              </div>

              {error && (
                <div className="mb-3 text-danger small">{error}</div>
              )}

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                style={{
                  background: "linear-gradient(90deg, #6f42c1, #6610f2)",
                  border: "none",
                }}
              >
                Login as {role}
              </Button>

              <div className="text-center text-muted mb-3">OR</div>

              <Button
                variant="outline-secondary"
                className="w-100 mb-3"
                onClick={handleGoogleLogin}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width="20"
                  className="me-2"
                />
                Continue with Google
              </Button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <a href="#" className="text-primary">Sign up</a>
              </p>
            </Form>


              {loginResult && (
        <div className="alert alert-success mt-3">
        <strong>Login Successful!</strong><br />
        Role: {loginResult.role} <br />
        Email: {loginResult.email}
        </div>
    )}

          </Tab.Pane>
        ))}
      </Tab.Content>

            </Tab.Container>

            <footer className="text-center text-muted mt-4">
              © 2026 VehicleTracker Pro. All rights reserved.
            </footer>
          </div>
        </Col>
      </Row>
    </Container>
      

      
  );
};

export default LoginPage;