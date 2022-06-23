import { Spinner, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Homework = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const loading = props.loading;

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
    </Container>
  );
};

export default Homework;
