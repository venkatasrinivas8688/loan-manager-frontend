import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await axios.get("https://loan-manager-backend-mafo.onrender.com/api/loans/verifier/dashboard"); // reuse same API
    setLoans(res.data.loans.filter((l) => l.status === "verified"));
  };

  const handleApprove = async (id) => {
    console.log(id)
    await axios.put(`https://loan-manager-backend-mafo.onrender.com/api/loans/approve/${id}`);
    fetchLoans(); // refresh
    //const res = await axios.get("https://loan-manager-backend-mafo.onrender.com/api/loans/verifier/dashboard");
    //setLoans(res.data.loans);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <table className="w-full table-auto border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="border-t">
              <td className="p-2">{loan.name}</td>
              <td>{loan.email}</td>
              <td>₹{loan.loanAmount}</td>
              <td>
                <button
                  onClick={() => handleApprove(loan._id)}
                  className="px-2 py-1 bg-green-600 text-white rounded"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
