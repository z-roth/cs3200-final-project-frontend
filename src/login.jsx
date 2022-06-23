import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:5000/login", {
      params: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        const name = Object.values(res.data[0])[0];
        if (name == null) {
          alert("Error signing in with provided credentials");
        } else {
          alert("Successfully signed in.");
          navigate("/");
          props.setUser({ email: email, name: name });
        }
      })
      .catch(() => {
        alert("Error signing in");
      });
  };

  return (
    <Form className="rounded p-4" onSubmit={(e) => handleSubmit(e)}>
      <Form.Group className="mb-4">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button className="m-2" type="submit">
        Submit
      </Button>
      <Button
        className="m-2"
        type="outline-primary"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default Login;
