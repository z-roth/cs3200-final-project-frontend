import { useState, useContext } from "react";
import { userContext } from "./App";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const CreateGoal = (props) => {
  const [goal, setGoal] = useState("");

  const user = useContext(userContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/create-goal", {
      user: user.email,
      goal: goal,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully created goal.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error creating goal");
        console.log(err);
      });
  };

  return (
    <Container className="p-3">
      <h1>Create New Goal</h1>
      <Form className="mt-3 p-2" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Goal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter goal here"
            onChange={(e) => setGoal(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateGoal;
