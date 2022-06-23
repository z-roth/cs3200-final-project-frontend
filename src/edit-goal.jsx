import { useLocation } from "react-router-dom";

const EditGoal = () => {
  const { state } = useLocation();
  console.log(state);
  return <p>Yeet</p>;
};

export default EditGoal;
