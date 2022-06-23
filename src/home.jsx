import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { userContext } from "./App";
import Classes from "./classes";
import Axios from "axios";
import Homework from "./homework";
import Tasks from "./tasks";

const Home = () => {
  const [classesLoading, setClassesLoading] = useState(true);
  const [classes, setClasses] = useState([{}]);

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

  return (
    <Container className="p-4">
      <h1>Hi, {user.name}.</h1>
      <Classes isLoading={classesLoading} data={classes} />
      <Homework isLoading={false} data={{}} />
      <Tasks />
    </Container>
  );
};

export default Home;
