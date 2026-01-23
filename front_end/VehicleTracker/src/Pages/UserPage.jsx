import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import AddVehicle from "../Components/AddVehicle";
import CreateDrive from "../Components/CreateDrive";

const UserPage = () => {
  return (
    <>
          <AddVehicle/>
          <CreateDrive/>
    </>
  );
};

export default UserPage;
