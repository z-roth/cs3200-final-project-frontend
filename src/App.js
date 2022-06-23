import { createContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./login.jsx";
import Signup from "./signup";
import Home from "./home";
import { useNavigate } from "react-router-dom";
import CreateClass from "./create-class";
import CreateHomework from "./create-homework";
import Axios from "axios";

const userContext = createContext({});

function App() {
  const [user, setUser] = useState({ name: "", email: "" });

  console.log(user);
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
      </Routes>
    </userContext.Provider>
  );
}

export default App;
export { userContext };
