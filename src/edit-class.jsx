import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { userContext } from "./App";
import { Container, Form, Button, Card } from "react-bootstrap";
import Axios from "axios";

const EditClass = () => {
  const { state } = useLocation();
  const [name, setName] = useState(state.course.name);
  const [location, setLocation] = useState(state.course.location);
  const [days, setDays] = useState(state.course.daysOfWeek);
  const [startTime, setStartTime] = useState(
    state.course.startTime.substring(0, 5)
  );
  const [endTime, setEndTime] = useState(state.course.endTime.substring(0, 5));

  const user = useContext(userContext);
  const navigate = useNavigate();

  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

  const handleCheckbox = (day) => {
    console.log(days);
    var dayChar = convertDay(day);

    days.includes(dayChar)
      ? setDays(days.replace(dayChar, "").split().sort(comp).join())
      : setDays((days + dayChar).split("").sort(comp).join(""));
  };

  const convertDay = (day) => {
    if (day === "Th") {
      return "H";
    }
    if (day === "Su") {
      return "U";
    }
    return day;
  };

  const comp = (a, b) => {
    var compareString = "MTWHFSU";
    if (compareString.indexOf(a) < compareString.indexOf(b)) {
      return -1;
    }
    if (compareString.indexOf(b) < compareString.indexOf(a)) {
      return 1;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.put("http://localhost:5000/edit-class", {
      user: user.email,
      code: state.course.code,
      name: name,
      location: location,
      days: days,
      startTime: startTime,
      endTime: endTime,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully updated class.");
        exams2.forEach((exam) => {
          console.log(exam);
          Axios.post("http://localhost:5000/create-exam", {
            user: user.email,
            course: state.course.code,
            name: exam.name,
            date: exam.date,
          })
            .then(() => {
              alert("Successfully created exam.");
            })
            .catch(console.log("Could not create exam: ", exam.name));
        });
        navigate("/");
      })
      .catch((err) => {
        alert("Error updating class");
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    Axios.delete("http://localhost:5000/delete-class", {
      params: {
        email: user.email,
        code: state.course.code,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Successfully deleted class.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error deleting class.");
        console.log(err);
      });
  };

  const [exams, setExams] = useState(state.classExams);

  const [keyCount, setKeyCount] = useState(0);
  const [exams2, setExams2] = useState(new Map());

  const handleRemove = (key) => {
    console.log(key);
    setExamCards(examCards.filter((examCard) => examCard.key !== key));
    setExams2(new Map(exams2.delete(`${key}`)));
  };

  const handleUpdate = (key, data) => {
    setExams2(new Map(exams2.set(`${key}`, data)));
    console.log(exams2);
  };

  const handleNewExam = (e) => {
    e.preventDefault();
    setExamCards([
      ...examCards,
      <ExamCardUpdate
        key={keyCount + 1}
        id={keyCount + 1}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
      />,
    ]);
    setKeyCount(keyCount + 1);
  };

  const [examCards, setExamCards] = useState([
    <ExamCardUpdate
      key="0"
      id="0"
      handleRemove={handleRemove}
      handleUpdate={handleUpdate}
    />,
  ]);

  console.log(state);
  return (
    <Container className="p-3">
      <h1>Edit Class: {state.course.code}</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Edit Class Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Class Location</Form.Label>
          <Form.Control
            type="text"
            defaultValue={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group key="inline-checkbox">
          <Form.Label>Days of Week</Form.Label>
          <br></br>
          {daysOfWeek.map((day) => (
            <Form.Check
              inline
              label={day}
              key={day}
              onChange={() => handleCheckbox(day)}
              defaultChecked={state.course.daysOfWeek.includes(convertDay(day))}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Class Start Time</Form.Label>
          <Form.Control
            type="time"
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Class End Time</Form.Label>
          <Form.Control
            type="time"
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Form.Group>
        <h4 className="exams-title">
          Exams<Button onClick={handleNewExam}>New Exam</Button>
        </h4>
        {exams.map((exam) => (
          <ExamCardDelete data={exam} state={state} />
        ))}
        {examCards}
        <Button type="submit">Submit</Button>
        <Button variant="danger" onClick={(e) => handleDelete(e)}>
          Delete Class
        </Button>
      </Form>
    </Container>
  );
};

const ExamCardDelete = (props) => {
  const user = useContext(userContext);
  const deleteExam = (name, date) => {
    Axios.delete("http://localhost:5000/delete-exam", {
      params: {
        user: user.email,
        course: props.state.course.code,
        name: name,
        date: date,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Successfully deleted exam.");
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting exam.");
      });
  };

  return (
    <Card className="p-2 mb-2">
      <Card.Title className="exams-title">
        {props.data.examName}{" "}
        <Button
          variant="danger"
          onClick={() =>
            deleteExam(
              props.data.examName,
              props.data.examDate.substring(0, 10)
            )
          }
        >
          Delete Exam
        </Button>
      </Card.Title>
    </Card>
  );
};

const ExamCardUpdate = (props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(0);

  useEffect(() => {
    console.log(name, date);
    props.handleUpdate(props.id, { name: name, date: date });
  }, [name, date, props]);

  return (
    <Card className="p-2 mb-2">
      <Card.Title className="exams-title">
        New Exam{" "}
        <Button
          variant="danger"
          onClick={() => {
            props.handleRemove(props.id);
          }}
        >
          Remove
        </Button>
      </Card.Title>
      <Form.Group>
        <Form.Label>Exam Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter exam name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Exam Date</Form.Label>
        <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
      </Form.Group>
    </Card>
  );
};

export default EditClass;
