import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Test from "./pages/Test";
import Voice from "./components/Voice";
import Word from "./pages/Word";
import IsLoggedType from "./pages/IsLoggedType";
import LoggedType from "./pages/LoggedType";
import Loading from "./pages/Loading";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signuppage" element={<Signup />} />
          <Route path="/loginpage" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/speech_to_text" element={<Voice />} />
          <Route path="/word" element={<Word />} />
          <Route path="/isLogged/type" element={<IsLoggedType />} />
          <Route path="/Logged/type" element={<LoggedType />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
