import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import AddVehicle from "../Components/AddVehicle";
import CreateDrive from "../Components/CreateDrive";
import AddCheckpoint from "../Components/AddCheckpoint";


const UserPage = () => {
  return (
    <>
       
     <AddVehicle/>
     <CreateDrive/>
     <AddCheckpoint />
    </>
  );
};

export default UserPage;
