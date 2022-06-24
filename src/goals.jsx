import { Spinner, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homework.css";
import "./goals.css";
import Axios from "axios";
import { useContext, useState } from "react";
import { userContext } from "./App";

const Goals = (props) => {
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.loading;
  const user = useContext(userContext);

  const deleteGoal = (goalName) => {
    Axios.delete("http://localhost:5000/delete-goal", {
      params: {
        user: user.email,
        name: goalName,
      },
    })
      .then((res) => {
        alert("Goal deleted successfully.");
        setReload(reload + 1);
      })
      .catch((err) => {
        alert("Error deleting goal.");
      });
  };

  return loading ? (
    <div>
      <Spinner></Spinner>
      <p>Loading...</p>
    </div>
  ) : (
    <Container className="m-3 mt-4">
      <div className="header">
        <h3>Goals</h3>
        <Button onClick={() => navigate("/create-goal")}>
          Create New Goal
        </Button>
      </div>
      {data ? (
        <h5>No goals to display</h5>
      ) : (
        data.map((goal) => {
          return (
            <Card key={goal.name} className="task">
              <Card.Header className="goal">
                <Form.Check label={goal.name} checked={goal.isDone} />
                <Button variant="danger" onClick={() => deleteGoal(goal.name)}>
                  Delete Goal
                </Button>
              </Card.Header>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Goals;
