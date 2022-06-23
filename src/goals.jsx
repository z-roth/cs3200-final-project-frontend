import { Spinner, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homework.css";
import "./goals.css";

const Goals = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.loading;

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
      {data.map((goal) => {
        return (
          <Card key={goal.name} className="task">
            <Card.Header className="goal">
              <Form.Check label={goal.name} checked={goal.isDone} />
              <Button onClick={() => navigate("/edit-goal")}>Edit Goal</Button>
            </Card.Header>
          </Card>
        );
      })}
    </Container>
  );
};

export default Goals;
