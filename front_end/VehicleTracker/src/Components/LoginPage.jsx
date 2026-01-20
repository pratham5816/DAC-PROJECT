// import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function LoginPage() {
//   const [role, setRole] = useState('driver');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

// //   const handleDemoLogin = () => {
// //     if (role === 'driver') {
// //       setUsername('driver1');
// //       setPassword('demo123');
// //     } else {
// //       setUsername('owner1');
// //       setPassword('demo123');
// //     }
// //   };

//   const handleLogin = () => {
//     alert(`Logging in as ${role} with username: ${username}`);
//     // Add actual login logic here
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mx-auto" style={{ maxWidth: '400px' }}>
//         <div className="card-body">
//           <h4 className="card-title text-center mb-4">Vehicle Tracking System</h4>

//           <div className="mb-3">
//             <label className="form-label">Select Role</label>
//             <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="driver">Driver</option>
//               <option value="owner">Owner/Customer</option>
//             </select>
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>

//           <div className="d-grid gap-2">
//             <button className="btn btn-primary" onClick={handleLogin}>Login</button>
//             {/* <button className="btn btn-secondary" onClick={handleDemoLogin}>Quick Demo Login</button> */}
//           </div>

//           <div className="mt-4 text-muted small">
//             <p>✓ No GPS hardware costs</p>
//             <p>✓ Use existing smartphones</p>
//             <p>✓ Real-time tracking</p>
//             <p>✓ Checkpoint validation</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


// import { useState } from 'react';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleDemoLogin = () => {
//     setUsername('demoUser');
//     setPassword('demo123');
//   };

//   const handleLogin = () => {
//     alert(`Logging in with username: ${username}`);
//     // Add actual login logic here
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card mx-auto shadow" style={{ maxWidth: '400px' }}>
//         <div className="card-body">
//           <h4 className="card-title text-center mb-4">Login</h4>

//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="d-grid gap-2">
//             <button className="btn btn-primary" onClick={handleLogin}>Login</button>
//             <button className="btn btn-outline-secondary" onClick={handleDemoLogin}>Quick Demo Login</button>
//           </div>

//           <div className="mt-4 text-muted small">
//             <p>✓ No GPS hardware costs</p>
//             <p>✓ Use existing smartphones</p>
//             <p>✓ Real-time tracking</p>
//             <p>✓ Checkpoint validation</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;







import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Panel */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            background: "linear-gradient(135deg, #6f42c1, #6610f2)",
          }}
        >
          <h1 className="fw-bold mb-3">📍 VehicleTracker Pro</h1>
          <p className="lead text-center mb-4">
            Track, Monitor, and Manage Your Fleet in Real-Time
          </p>
          <ul className="list-unstyled text-center">
            <li>🚗 500+ Active Vehicles</li>
            <li>⚡ 99.9% Uptime</li>
            <li>🛠️ 24/7 Support</li>
          </ul>
        </Col>

        {/* Right Panel */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center p-5"
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h2 className="fw-semibold mb-2">Welcome Back!</h2>
            <p className="text-muted mb-4">Sign in to access your dashboard</p>

            <Form>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Enter your password" />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#" className="text-primary">Forgot password?</a>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                style={{
                  background: "linear-gradient(90deg, #6f42c1, #6610f2)",
                  border: "none",
                }}
              >
                Sign In
              </Button>

              <div className="text-center text-muted mb-3">OR</div>

              <Button variant="outline-secondary" className="w-100 mb-3">
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