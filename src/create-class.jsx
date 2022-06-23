import { Form, Container, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "./App";

const CreateClass = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const user = useContext(userContext);

  const navigate = useNavigate();

  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

  const handleSubmit = (e) => {
    e.preventDefault();

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
        navigate("/");
      })
      .catch((err) => {
        alert("Error creating class.");
        console.log(err);
      });
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
        <Form.Group>
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateClass;
