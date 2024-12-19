import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddInvestment from "./components/AddInvestment";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";
import UpdateData from "./components/UpdateData";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addinvestment" element={<AddInvestment />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/updateData" element={<UpdateData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
