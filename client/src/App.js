import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import ProfitChecker from "./components/stockComponets/ProfitChecker";
import FixedBillComp from "./components/billComponents/FixedBillComp";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profitCalculator" element={<ProfitChecker />} />
          <Route path="/fixedpay" element={<FixedBillComp/>} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;