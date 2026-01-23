import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AppLayout = () => {
  return (
    <>
      <Header />

      {/* Page content */}
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      <Footer/>
    </>
  );
};

export default AppLayout;
