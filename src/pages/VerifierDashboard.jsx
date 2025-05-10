import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifierDashboard() {
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState({ totalLoans: 0, cashDisbursed: 0 });

  const fetchData = async () => {
    const res = await axios.get("https://loan-manager-backend-mafo.onrender.com/api/loans/verifier/dashboard");
    setLoans(res.data.loans);
    setStats({
      totalLoans: res.data.totalLoans,
      cashDisbursed: res.data.cashDisbursed
    });
  };

  const handleVerify = async (id) => {
    await axios.put(`https://loan-manager-backend-mafo.onrender.com/api/loans/verify/${id}`);
    fetchData(); // refresh
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Verifier Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded shadow">
          <p>Total Loans</p>
          <h2 className="text-xl font-bold">{stats.totalLoans}</h2>
        </div>
        <div className="p-4 bg-blue-100 rounded shadow">
          <p>Total Cash Disbursed</p>
          <h2 className="text-xl font-bold">₹{stats.cashDisbursed}</h2>
        </div>
      </div>

      <table className="w-full table-auto border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id} className="border-t">
              <td className="p-2">{loan.name}</td>
              <td>{loan.email}</td>
              <td>₹{loan.loanAmount}</td>
              <td>{loan.status}</td>
              <td>
                {loan.status === "pending" && (
                  <button
                    onClick={() => handleVerify(loan._id)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Verify
                  </button>
                )}
                {loan.status !== "pending" && <span className="text-green-600">Verified</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
