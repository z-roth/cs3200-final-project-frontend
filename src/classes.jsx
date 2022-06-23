import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./classes.css";

const Classes = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.isLoading;

  const formatDays = (daysOfWeek) => {
    const days = new Map();
    days.set("M", "Monday");
    days.set("T", "Tuesday");
    days.set("W", "Wednesday");
    days.set("H", "Thursday");
    days.set("F", "Friday");
    days.set("S", "Saturday");
    days.set("U", "Sunday");

    return daysOfWeek
      .split("")
      .map((day) => {
        return days.get(day);
      })
      .join(", ");
  };

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
              <b>
                {course.startTime.substring(0, 5)} -{" "}
                {course.endTime.substring(0, 5)}
              </b>{" "}
              {formatDays(course.daysOfWeek)}
              <Card>
                <Card.Body>
                  <Card.Title className="class-title">
                    <b>{course.name}</b>
                    {"  "}
                    {course.code}
                    <Button
                      onClick={() => {
                        navigate("/edit-class", { state: course });
                      }}
                    >
                      Edit Class
                    </Button>
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
