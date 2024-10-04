import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddInvestment from "./components/AddInvestment";
import LogIn from "./components/LogIn";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinvestment" element={<AddInvestment />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
