import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import Axios from "axios";
import { userContext } from "./App";

const EditHomework = () => {
  const { state } = useLocation();

  const [classesLoading, setClassesLoading] = useState(true);
  const [classes, setClasses] = useState([{}]);
  const [course, setCourse] = useState(state.classCode);
  const [name, setName] = useState(state.name);
  const [description, setDescription] = useState(state.description);
  const [dueDate, setDueDate] = useState(state.dueDate.substring(0, 10));
  const [dueTime, setDueTime] = useState(state.dueTime.substring(0, 5));

  const user = useContext(userContext);

  const navigate = useNavigate();
  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.put("http://localhost:5000/edit-homework", {
      user: user.email,
      code: course,
      name: name,
      description: description,
      dueDate: dueDate,
      dueTime: dueTime,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully edited homework.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error editing homework");
        console.log(err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    Axios.delete("http://localhost:5000/delete-homework", {
      params: {
        id: state.hwId,
      },
    })
      .then((res) => {
        console.log(res);
        alert("Successfully deleted homework.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error deleting homework");
        console.log(err);
      });
  };

  if (classesLoading) {
    Axios.get("http://localhost:5000/classes", {
      params: {
        email: user.email,
      },
    })
      .then((res) => {
        console.log("Successfully loaded classes.");
        console.log(res);
        setClasses(res.data);
        setClassesLoading(false);
      })
      .catch((err) => {
        console.log("Failed to load classes.");
      });
  }

  console.log(state);
  return (
    <Container className="p-3">
      <h1>Edit Homework</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Edit Name</Form.Label>
          <Form.Control
            type="text"
            placholder="Enter homework name here"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Class</Form.Label>
          {classesLoading ? (
            <p>Loading...</p>
          ) : (
            <Form.Select onChange={(e) => setCourse(e.target.value)}>
              <option>{course}</option>
              {classes.map((c) => (
                <option>{c.code}</option>
              ))}
            </Form.Select>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Date Due</Form.Label>
          <Form.Control
            type="date"
            defaultValue={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Edit Time Due</Form.Label>
          <Form.Control
            type="time"
            defaultValue={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
        <Button variant="danger" onClick={(e) => handleDelete(e)}>
          Delete Homework
        </Button>
      </Form>
    </Container>
  );
};

export default EditHomework;
