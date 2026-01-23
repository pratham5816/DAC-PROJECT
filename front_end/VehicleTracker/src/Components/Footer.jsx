import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3">
      <small>
        © {new Date().getFullYear()} TrackRide · Smart Vehicle Tracking
      </small>
    </footer>
  );
};

export default Footer;
