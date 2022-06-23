import { Spinner, Container, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./homework.css";
import Axios from "axios";
import { useContext } from "react";
import { userContext } from "./App";

const Homework = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.loading;

  const user = useContext(userContext);

  console.log(data);

  const formatDate = (d) => {
    const date = new Date(d);
    return [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/");
  };

  const handleCheck = (name, course, dueDate, value) => {
    Axios.put("http://localhost:5000/update-check", {
      email: user.email,
      course: course,
      name: name,
      dueDate: dueDate,
      truthValue: value,
    })
      .then((res) => {
        console.log("Successfully Checked");
      })
      .catch((err) => {
        console.log("Unsuccessfully Checked");
      });
  };

  return loading ? (
    <div>
      <Spinner></Spinner>
      <p>Loading...</p>
    </div>
  ) : (
    <Container className="m-3 mt-4">
      <div className="header">
        <h3>Homework</h3>
        <Button onClick={() => navigate("/create-homework")}>
          Create New Homework
        </Button>
      </div>
      {data.length == 0 ? (
        <h5>No homework to display.</h5>
      ) : (
        data.map((hw) => {
          return (
            <div>
              <Card key={hw.name} className="task">
                <Card.Header>
                  <Form.Check
                    label={`Due ${formatDate(hw.dueDate)} at ${hw.dueTime}`}
                    checked={hw.isDone}
                    onChange={handleCheck(
                      hw.name,
                      hw.classCode,
                      hw.dueDate ? hw.dueDate.substring(0, 10) : hw.dueDate,
                      !hw.isDone
                    )}
                  ></Form.Check>
                </Card.Header>
                <Card.Body>
                  <h5 className="header">
                    <div>
                      <b>{hw.classCode}:</b> {hw.name}
                    </div>
                    <Button
                      onClick={() => {
                        navigate("/edit-homework", { state: hw });
                      }}
                    >
                      Edit Homework
                    </Button>
                  </h5>
                  {`Description: ${hw.description}`}
                </Card.Body>
              </Card>
            </div>
          );
        })
      )}
    </Container>
  );
};

export default Homework;
