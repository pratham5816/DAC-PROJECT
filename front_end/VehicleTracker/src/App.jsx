import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import LoginPage from './Pages/LoginPage';
import DriverPage from "./Pages/DriverPage";
import UserPage from "./Pages/UserPage";
import CustomerPage from "./Pages/CustomerPage";

import './App.css';


// Wrapper to pass navigate into LoginPage
function LoginPageWrapper() {
  const navigate = useNavigate();

  const handleLogin = (role, email) => {
    console.log("Logged in as:", role, "with email:", email);

    if (role === "driver") {
      navigate("/driver");   // ✅ Navigate to DriverPage
    } else if (role === "user") {
      navigate("/user");     // later add UserPage
    } else if (role === "customer") {
      navigate("/customer"); // later add CustomerPage
    }

  };

  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
      
        <Route path="/" element={<LoginPageWrapper />} />
          <Route element={<AppLayout />}>
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;

