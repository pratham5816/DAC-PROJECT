import React, { useEffect, useState } from "react";
import CheckCurrentLocation from "../Components/CheckCurrentLocation.jsx";
import GetExactLocation from "../Components/GetExactLocationKm.jsx";
import "../css/CustomerPage.css";

const CustomerPage = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("loginResponseObj");

    if (storedData) {
      const responseObj = JSON.parse(storedData);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCustomer({
        name: responseObj?.name || "customer",
        email: responseObj?.email || "",
        phone: responseObj?.phone || "",
      });
    }
  }, []);

  return (
    <div className="customer-page-wrapper">
      <div className="customer-header">
        <h4>👋 Welcome {name}</h4>
        <p>{customer.email}</p>
        {customer.phone && <p>📞 {customer.phone}</p>}
      </div>

      <CheckCurrentLocation />
      <GetExactLocation />
    </div>
  );
};

export default CustomerPage;
