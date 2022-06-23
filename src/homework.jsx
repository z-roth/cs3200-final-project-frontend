import {
  Spinner,
  Container,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homework.css";

const Homework = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.loading;

  console.log(data);

  const formatDate = (d) => {
    const date = new Date(d);
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/");
  };

  return loading ? (
    <div>
      <Spinner></Spinner>
      <p>Loading...</p>
    </div>
  ) : (
    <Container className="m-3 mt-4">
      <div className="header">
        <h3>Homework</h3>
        <Button onClick={() => navigate("/create-homework")}>
          Create New Homework
        </Button>
      </div>
      {data.map((hw) => {
        return (
          <div>
            <Card key={hw.name} className="task">
              <Card.Header>
                <Form.Check
                  label={`Due ${formatDate(hw.dueDate)} at ${hw.dueTime}`}
                ></Form.Check>
              </Card.Header>
              <Card.Body>
                <h5>
                  <b>{hw.classCode}:</b> {hw.name}
                </h5>
                {`Description: ${hw.description}`}
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </Container>
  );
};

export default Homework;
