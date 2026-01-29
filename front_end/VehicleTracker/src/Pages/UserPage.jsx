import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import AddVehicle from "../Components/AddVehicle";
import CreateDrive from "../Components/CreateDrive";
import AddCheckpoint from "../Components/AddCheckpoint";
import CheckCurrentLocation from "../Components/CheckCurrentLocation";
import GetExactLocation from "../Components/GetExactLocationKm";


const UserPage = () => {
  return (
    <>
       
     <AddVehicle/>
     <CreateDrive/>
     <AddCheckpoint />
     <CheckCurrentLocation/>
     <GetExactLocation />
    </>
  );
};

export default UserPage;
