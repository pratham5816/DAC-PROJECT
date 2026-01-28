import React, { useState } from "react";
import { Card, Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";

const Checkpoint = () => {
  const [show, setShow] = useState(false);
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleCheckpoints = async () => {
    // If already loaded, just toggle UI
    if (checkpoints.length > 0) {
      setShow(!show);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/checkpoint/getAll");
      setCheckpoints(res.data);
      setShow(true);
    } catch (error) {
      console.error("Error fetching checkpoints", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <Button
        variant="outline-primary"
        className="w-100"
        onClick={toggleCheckpoints}
      >
         {show ? "Hide Checkpoints" : "Show Checkpoints"}
      </Button>

      {show && (
        <Card className="mt-3 shadow-sm">
          <Card.Body>
            <Card.Title>Checkpoint List</Card.Title>

            {loading ? (
              <div className="text-center my-3">
                <Spinner animation="border" />
              </div>
            ) : (
              <Table bordered hover responsive className="mt-3 text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {checkpoints.map((cp) => (
                    <tr key={cp.id}>
                      <td>{cp.id}</td>
                      <td>{cp.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Checkpoint;
