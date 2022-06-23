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
        if (res.data[0].email === email && res.data[0].password === password) {
          alert("Successfully signed in.");
          props.setUser({ email: res.data[0].email, name: res.data[0].name });
          navigate("/");
        } else {
          alert("Unable to sign in with provided credentials.");
        }
      })
      .catch((err) => console.log(err));
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
