
// import React from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";

// const LoginPage = () => {
//   return (
//     <Container fluid className="vh-100">
//       <Row className="h-100">
//         {/* Left Panel */}
//         <Col
//           md={6}
//           className="d-flex flex-column justify-content-center align-items-center text-white p-5"
//           style={{
//             background: "linear-gradient(135deg, #6f42c1, #6610f2)",
//           }}
//         >
//           <h1 className="fw-bold mb-3">📍 VehicleTracker Pro</h1>
//           <p className="lead text-center mb-4">
//             Track, Monitor, and Manage Your Fleet in Real-Time
//           </p>
//           <ul className="list-unstyled text-center">
//             <li>🚗 500+ Active Vehicles</li>
//             <li>⚡ 99.9% Uptime</li>
//             <li>🛠️ 24/7 Support</li>
//           </ul>
//         </Col>

//         {/* Right Panel */}
//         <Col
//           md={6}
//           className="d-flex flex-column justify-content-center align-items-center p-5"
//         >
//           <div className="w-100" style={{ maxWidth: "400px" }}>
//             <h2 className="fw-semibold mb-2">Welcome Back!</h2>
//             <p className="text-muted mb-4">Sign in to access your dashboard</p>

//             <Form>
//               <Form.Group className="mb-3" controlId="formEmail">
//                 <Form.Control type="email" placeholder="Enter your email" />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="formPassword">
//                 <Form.Control type="password" placeholder="Enter your password" />
//               </Form.Group>

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <Form.Check type="checkbox" label="Remember me" />
//                 <a href="#" className="text-primary">Forgot password?</a>
//               </div>

//               <Button
//                 variant="primary"
//                 type="submit"
//                 className="w-100 mb-3"
//                 style={{
//                   background: "linear-gradient(90deg, #6f42c1, #6610f2)",
//                   border: "none",
//                 }}
//               >
//                 Sign In
//               </Button>

//               <div className="text-center text-muted mb-3">OR</div>

              // <Button variant="outline-secondary" className="w-100 mb-3">
              //   <img
              //     src="https://www.svgrepo.com/show/475656/google-color.svg"
              //     alt="Google"
              //     width="20"
              //     className="me-2"
              //   />
              //   Continue with Google
              // </Button>

            //   <p className="text-center mt-3">
            //     Don't have an account?{" "}
            //     <a href="#" className="text-primary">Sign up</a>
            //   </p>
            // </Form>

//             <footer className="text-center text-muted mt-4">
//               © 2026 VehicleTracker Pro. All rights reserved.
//             </footer>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPage;






import React, {useState} from 'react';
import { Container, Row, Col, Form, Button, Tab, Nav } from "react-bootstrap";


const LoginPage = ({ onLogin }) => {
    const [activeTab, setActiveTab] = useState("driver");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  // Demo credentials for all roles
  const demoCredentials = {
       driver: { email: "driver@example.com", password: "demo123" },
       user: { email: "user@example.com", password: "demo123" },
       customer: { email: "customer@example.com", password: "demo123" },

  };

    // Regex patterns
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email validation

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; 
  // min 6 chars, at least one letter and one number


 const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email address and password");
      return;
    }

    // Regex validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters, with at least one letter and one number.");
      return;
    }


 // Demo authentication
    const credentials = demoCredentials[activeTab];
    if (email === credentials.email && password === credentials.password) {
      onLogin(activeTab, email);
    } else {
      setError("Invalid credentials. Use demo credentials shown below.");
    }
  };

 const handleDemoLogin = () => {
    const credentials = demoCredentials[activeTab];
    setEmail(credentials.email);
    setPassword(credentials.password);
    onLogin(activeTab, credentials.email);
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
                onClick={handleDemoLogin}
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