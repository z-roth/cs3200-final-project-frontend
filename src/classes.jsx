import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./classes.css";

const Classes = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.isLoading;
  const exams = props.exams;

  const formatExams = (code) => {
    const examsForClass = filterExams(code);
    console.log(examsForClass, code);
    const builtExams = examsForClass.map((exam) => (
      <p>{`${exam.examDate.substring(0, 10)}: ${exam.examName}`}</p>
    ));
    return builtExams;
  };

  const filterExams = (code) => {
    var examsForClass = exams.filter((exam) => exam.class === code);
    console.log(code, examsForClass);
    return examsForClass;
  };

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
        <h5>No classes to display.</h5>
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
                        navigate("/edit-class", {
                          state: {
                            course: course,
                            classExams: filterExams(course.code),
                          },
                        });
                      }}
                    >
                      Edit Class
                    </Button>
                  </Card.Title>
                  <Card.Text>
                    {course.location}
                    <br></br>
                    {"Exams:"}
                    {formatExams(course.code)}
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
