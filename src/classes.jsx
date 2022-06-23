import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./classes.css";

const Classes = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.isLoading;

  console.log(data);
  console.log(loading);

  return loading ? (
    <div>
      <Spinner></Spinner>
      <p>Loading...</p>
    </div>
  ) : (
    <Container className="m-3">
      <div className="header">
        <h3>Classes</h3>
        <Button onClick={() => navigate("/create-class")}>
          Create New Class
        </Button>
      </div>
      {data.length === 0 ? (
        <Card className="class-container">
          <Card.Title className="class-title">
            No more classes today.
          </Card.Title>
        </Card>
      ) : (
        data.map((course) => {
          return (
            <div className="class-container">
              {course.startTime} - {course.endTime}
              <Card>
                <Card.Body>
                  <Card.Title className="class-title">
                    <b>{course.name}</b>
                    {"  "}
                    {course.code}
                    <Button>Edit Class</Button>
                  </Card.Title>
                  <Card.Text>
                    {course.location}
                    <br></br>
                    {"Exams:"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Classes;
