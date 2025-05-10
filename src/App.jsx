import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoanForm from "./pages/LoanForm";
import VerifierDashboard from "./pages/VerifierDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex gap-4">
        <Link to="/">Loan Form</Link>
        <Link to="/verifier">Verifier</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LoanForm />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
