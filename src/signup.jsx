import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("http://localhost:5000/create-user", {
      name: name,
      email: email,
      password: password,
    })
      .then((res) => {
        console.log("success");
        alert("successfully created user");
        console.log(res);
        props.setUser({ name: name, email: email });
        navigate("/");
      })
      .catch((err) => {
        console.log("fail");
        alert("Error creating user.");
        console.log(err);
      });
  };

  return (
    <Form
      className="rounded p-4"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Form.Group className="mb-4">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button className="m-2" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Signup;
