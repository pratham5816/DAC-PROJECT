
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // USER / DRIVER / CUSTOMER

  const logout = () => {
    localStorage.clear();
    navigate("/");
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
            onClick={logout}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;