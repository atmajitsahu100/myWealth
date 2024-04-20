import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/UserContext";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import ProfitChecker from "./components/stockComponets/ProfitChecker";
import Investment from "./components/investComponents/Investment";
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
          <Route path="/stock" element={<Stock />} />

          <Route path="/profitCalculator" element={<ProfitChecker />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/fixedpay" element={<FixedBillComp/>} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;