import { useContext, useState } from "react";
import { userContext } from "./App";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import Axios from "axios";

const CreateHomework = (props) => {
  const [classesLoading, setClassesLoading] = useState(true);
  const [classes, setClasses] = useState([{}]);
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(0);
  const [dueTime, setDueTime] = useState(0);

  const user = useContext(userContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:5000/create-homework", {
      user: user.email,
      code: course,
      name: name,
      description: description,
      dueDate: dueDate,
      dueTime: dueTime,
    })
      .then((res) => {
        console.log(res);
        alert("Successfully created homework.");
        navigate("/");
      })
      .catch((err) => {
        alert("Error creating homework");
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

  return (
    <Container className="p-3">
      <h1>Create New Homework</h1>
      {props.isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <Form className="mt-3 p-2" onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Homework Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter homework name here"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Homework Class</Form.Label>
            <Form.Select onChange={(e) => setCourse(e.target.value)}>
              {classes.map((c) => (
                <option>{c.code}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Homework Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Due</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time Due</Form.Label>
            <Form.Control
              type="time"
              onChange={(e) => setDueTime(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      )}
    </Container>
  );
};

export default CreateHomework;
