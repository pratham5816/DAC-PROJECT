import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import AddVehicle from "../Components/AddVehicle";
import CreateDrive from "../Components/CreateDrive";
import AddCheckpoint from "../Components/AddCheckpoint";
import CheckCurrentLocation from "../Components/CheckCurrentLocation";
import GetExactLocation from "../Components/GetExactLocationKm";
import "../css/UserPage.css";


const UserPage = () => {
    const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("loginResponseObj");

    if (storedData) {
      const responseObj = JSON.parse(storedData);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        name: responseObj?.name || "user",
        email: responseObj?.email || "",
      });
    }
  }, []);
  return (
    <>
    <div className="user-page-wrapper">
      <div className="user-header">
        <h4>👋 Welcome {name}</h4>
        <p>{user.email}</p>
        {user.phone && <p>📞 {user.phone}</p>}
      </div>
       </div>
     <AddVehicle/>
     <CreateDrive/>
     <AddCheckpoint />
     <CheckCurrentLocation/>
     <GetExactLocation />
    </>
  );
};

export default UserPage;
