import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <small>
        © {new Date().getFullYear()} TrackRide · Smart Vehicle Tracking
      </small>
    </footer>
  );
};

export default Footer;
