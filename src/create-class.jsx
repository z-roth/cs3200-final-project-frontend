import { Form, Container, Button, Card } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";
import "./create-class.css";

const CreateClass = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  
  const [keyCount, setKeyCount] = useState(0);
  const [exams, setExams] = useState(new Map());

  const handleRemove = (key) => {
    console.log(key);
    setExamCards(examCards.filter((examCard) => examCard.key !== key));
    setExams(new Map(exams.delete(`${key}`)));
  };

  const handleUpdate = (key, data) => {
    setExams(new Map(exams.set(`${key}`, data)));
    console.log(exams);
  };

  const handleNewExam = (e) => {
    e.preventDefault();
    setExamCards([
      ...examCards,
      <ExamCard
        key={keyCount + 1}
        id={keyCount + 1}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
      />,
    ]);
    setKeyCount(keyCount + 1);
  };

  const [examCards, setExamCards] = useState([
    <ExamCard
      key="0"
      id="0"
      handleRemove={handleRemove}
      handleUpdate={handleUpdate}
    />,
  ]);

  const user = useContext(userContext);

  const navigate = useNavigate();

  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(exams);

    Axios.post("http://localhost:5000/create-class", {
      user: user.email,
      name: name,
      code: code,
      location: location,
      days: days,
      startTime: startTime,
      endTime: endTime,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully created class.");

        exams.forEach((exam) => {
          console.log(exam);
          Axios.post("http://localhost:5000/create-exam", {
            user: user.email,
            course: code,
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
        alert("Error creating class.");
        console.log(err);
      });

    Axios.post("http://localhost:5000/create-exam");
  };

  const handleCheckbox = (day) => {
    var dayChar = day;
    if (day === "Th") {
      dayChar = "H";
    }

    if (day === "Su") {
      dayChar = "U";
    }

    days.includes(dayChar)
      ? setDays(days.replace(dayChar, "").split().sort(comp).join())
      : setDays((days + dayChar).split("").sort(comp).join(""));
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

  return (
    <Container className="p-3">
      <h1>Create New Class</h1>
      <Form className="mt-3 p-2" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Class Code</Form.Label>
          <Form.Control
            placeholder="Enter Class Code"
            required
            onChange={(e) => setCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class Name</Form.Label>
          <Form.Control
            placeholder="Enter Class Name"
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Class Location</Form.Label>
          <Form.Control
            placeholder="Enter Class Location"
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
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
            />
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => {
              setStartTime(e.target.value);
              console.log(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <h4 className="exams-title">
          Exams<Button onClick={(e) => handleNewExam(e)}>Add New Exam</Button>
        </h4>
        {examCards}
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const ExamCard = (props) => {
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

export default CreateClass;
