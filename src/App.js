import { createContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./login.jsx";
import Signup from "./signup";
import Home from "./home";
import CreateClass from "./create-class";
import CreateHomework from "./create-homework";
import CreateGoal from "./create-goal";
import EditClass from "./edit-class";
import EditHomework from "./edit-homework";
import EditUser from "./edit-user";

const userContext = createContext({});

function App() {
  const [user, setUser] = useState({ name: "", email: "" });
  const isLoggedIn = user.email !== "";

  return (
    <userContext.Provider value={{ name: user.name, email: user.email }}>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/create-homework" element={<CreateHomework />} />
        <Route path="/create-goal" element={<CreateGoal />} />
        <Route path="/edit-class" element={<EditClass />} />
        <Route path="/edit-homework" element={<EditHomework />} />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
