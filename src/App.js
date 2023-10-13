import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import MyBirthdays from "./Pages/MyBirthdays";
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybirthdays" element={<MyBirthdays />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
