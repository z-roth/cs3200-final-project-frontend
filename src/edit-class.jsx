import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { userContext } from "./App";
import { Container, Form, Button } from "react-bootstrap";
import Axios from "axios";

const EditClass = () => {
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [location, setLocation] = useState(state.location);
  const [days, setDays] = useState(state.daysOfWeek);
  const [startTime, setStartTime] = useState(state.startTime.substring(0, 5));
  const [endTime, setEndTime] = useState(state.endTime.substring(0, 5));

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
      code: state.code,
      name: name,
      location: location,
      days: days,
      startTime: startTime,
      endTime: endTime,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully updated homework.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error updating homework");
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    Axios.delete("http://localhost:5000/delete-class", {
      params: {
        email: user.email,
        code: state.code,
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

  console.log(state);
  return (
    <Container className="p-3">
      <h1>Edit Class: {state.code}</h1>
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
              defaultChecked={state.daysOfWeek.includes(convertDay(day))}
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
        <Button type="submit">Submit</Button>
        <Button variant="danger" onClick={(e) => handleDelete(e)}>
          Delete Class
        </Button>
      </Form>
    </Container>
  );
};

export default EditClass;
