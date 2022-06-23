import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { userContext } from "./App";
import Classes from "./classes";
import Axios from "axios";
import Homework from "./homework";
import Goals from "./goals";

const Home = () => {
  const [classesLoading, setClassesLoading] = useState(true);
  const [classes, setClasses] = useState([{}]);
  const [homeworkLoading, setHomeworkLoading] = useState(true);
  const [homework, setHomework] = useState([{}]);
  const [goalsLoading, setGoalsLoading] = useState(true);
  const [goals, setGoals] = useState([{}]);

  var user = useContext(userContext);

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

  if (homeworkLoading) {
    Axios.get("http://localhost:5000/homework", {
      params: {
        email: user.email,
      },
    })
      .then((res) => {
        setHomework(res.data);
        setHomeworkLoading(false);
      })
      .catch(console.log("Failed to load homework"));
  }

  if (goalsLoading) {
    Axios.get("http://localhost:5000/goals", {
      params: {
        email: user.email,
      },
    })
      .then((res) => {
        setGoals(res.data);
        console.log("Goals:", res.data);
        setGoalsLoading(false);
      })
      .catch(console.log("Failed to load goals"));
  }

  return (
    <Container className="p-4">
      <h1>Hi, {user.name}.</h1>
      <Classes isLoading={classesLoading} data={classes} />
      <Homework isLoading={homeworkLoading} data={homework} />
      <Goals isLoading={goalsLoading} data={goals} />
    </Container>
  );
};

export default Home;
