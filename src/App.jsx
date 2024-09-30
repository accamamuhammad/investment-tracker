import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddInvestment from "./components/AddInvestment";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addinvestment" element={<AddInvestment />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
