import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddInvestment from "./components/AddInvestment";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinvestment" element={<AddInvestment />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
