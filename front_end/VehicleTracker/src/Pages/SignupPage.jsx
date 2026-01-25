import { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import DriverSignup from "../Components/DriverSignup";
import "./LoginPage.css"; // 
import UserSignup from "../Components/UserSignup";
import CustomerSignup from "../Components/CustomerSignup";

function SignupPage() {
  const [activeTab, setActiveTab] = useState("driver");

  return (
    <Container fluid className="login-container">
      <Row className="h-100">

        {/* LEFT PANEL (same as login) */}
        <Col md={6} className="login-left">
          <h1 className="fw-bold mb-3">VehicleTracker</h1>
          <p className="lead text-center mb-2" style={{ fontSize: "15px" }}>
            Register to start tracking vehicles smartly
          </p>
        </Col>

        {/* RIGHT PANEL */}
        <Col md={6} className="login-right">
          <div className="login-form-wrapper">
            <h2 className="fw-semibold mb-2">Create Account</h2>
            <p className="text-muted mb-4">
              Choose your role to sign up
            </p>

            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
              
              {/* TABS */}
              <Nav variant="tabs" className="mb-4 justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="driver">
                    🚚 Driver
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="user">
                    👤 User
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="customer">
                    🧑‍🤝‍🧑 Customer
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              {/* TAB CONTENT */}
              <Tab.Content>
                <Tab.Pane eventKey="driver">
                  <DriverSignup />
                </Tab.Pane>

                <Tab.Pane eventKey="user">
                  <UserSignup/>
                </Tab.Pane>

                <Tab.Pane eventKey="customer">
                  <CustomerSignup/>
                </Tab.Pane>
              </Tab.Content>

            </Tab.Container>
          </div>
        </Col>

      </Row>
    </Container>
  );
}

export default SignupPage;
