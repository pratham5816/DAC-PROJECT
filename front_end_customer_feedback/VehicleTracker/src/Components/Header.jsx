
import React from "react";
import { Navbar, Nav, Container, Button , Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // USER / DRIVER / CUSTOMER

  //simple logout
  // const logout = () => {
  //   localStorage.clear();
  //   navigate("/");

  //for modal - handling logout 
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    setShowLogoutModal(false);
    navigate("/", { replace: true });

  };

  return (
    <Navbar expand="lg" sticky="top" className="app-header">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand
          className="header-brand"
          onClick={() => navigate("/")}
        >
          🚚 TrackRide
        </Navbar.Brand>

        {/* Mobile toggle */}
        <Navbar.Toggle className="border-0 text-white" />

        {/* Collapsible menu */}
        <Navbar.Collapse>
          <Nav className="me-auto mt-3 mt-lg-0">
            {role === "USER" && (
              <Nav.Link className="header-link" onClick={() => navigate("/user")}>
                Dashboard
              </Nav.Link>
            )}
            {role === "DRIVER" && (
              <Nav.Link className="header-link" onClick={() => navigate("/driver")}>
                Driver Panel
              </Nav.Link>
            )}
            {role === "CUSTOMER" && (
              <Nav.Link className="header-link" onClick={() => navigate("/customer")}>
                Live Track
              </Nav.Link>
            )}
          </Nav>

          <Button
            variant="outline-light"
            size="sm"
            className="mt-3 mt-lg-0"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Navbar.Collapse>

        <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>👋 Leaving already?</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center" }}>
          <p>Do you really want to logout? 🚚💙</p>
          {/* <p style={{ fontSize: "14px", color: "#6b7280" }}>
            We’ll miss you 
          </p> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Stay
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>
    </Navbar>
  );
};

export default Header;