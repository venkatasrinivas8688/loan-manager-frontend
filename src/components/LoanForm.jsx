import { useState } from "react";
import axios from "axios";

export default function LoanForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    loanAmount: "",
    loanTenureInMonths:"",
    employment: "",
    reasonForLoan:"",
    employmentAddress: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://loan-manager-backend-mafo.onrender.com/api/loans/apply", form);
    alert("Loan application submitted!");
    setForm({
      name: "",
      phone: "",
      email: "",
      loanAmount: "",
      employment: "",
      address: "",
      employmentAddress: ""
    });
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-xl shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Loan Application</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "phone", "email", "loanAmount", "loanTenureInMonths","employment", "employmentAddress","reasonForLoan"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}
