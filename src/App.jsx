import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddInvestment from "./components/AddInvestment";
import Navigation from "./components/Navigation"; // Add the Navigation component here
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinvestment" element={<AddInvestment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
