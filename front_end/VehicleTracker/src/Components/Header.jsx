import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // USER / DRIVER / CUSTOMER

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
   

    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
      <nav className="navbar navbar-dark bg-dark px-4">
  <span className="navbar-brand">🚚 TrackRide</span>
  <button className="btn btn-outline-light">Logout</button>
</nav>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {role === "USER" && <Nav.Link onClick={() => navigate("/user")}>Dashboard</Nav.Link>}
            {role === "DRIVER" && <Nav.Link onClick={() => navigate("/driver")}>Driver Panel</Nav.Link>}
            {role === "CUSTOMER" && <Nav.Link onClick={() => navigate("/customer")}>Live Track</Nav.Link>}
          </Nav>

          <Button variant="outline-light" size="sm" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
