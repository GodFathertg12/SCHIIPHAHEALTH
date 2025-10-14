"use client";

import { useState } from "react";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchPayments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminSecret: secret }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Access denied ❌");
      } else {
        setPayments(data.payments);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filtered = payments.filter((p) => {
    const matchSearch =
      search === "" ||
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.referral_code?.toLowerCase().includes(search.toLowerCase());

    const created = new Date(p.created_at);
    const afterStart = dateFrom ? created >= new Date(dateFrom) : true;
    const beforeEnd = dateTo ? created <= new Date(dateTo) : true;

    return matchSearch && afterStart && beforeEnd;
  });

  const exportCSV = () => {
    if (!filtered.length) return alert("No data to export");

    const headers = [
      "Date",
      "Email",
      "Amount",
      "Referral",
      "Status",
      "Name",
      "Phone",
      "Address",
    ];

    const rows = filtered.map((p) => [
      new Date(p.created_at).toLocaleString(),
      p.email,
      p.amount,
      p.referral_code,
      p.status,
      p.full_name || "-",
      p.phone || "-",
      p.address || "-",
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `payments-${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#222] p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#403F2B]">
        🧾 Schiipha Payments Dashboard
      </h1>

      {!payments.length ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-600 mb-3">
            Enter admin password to view all payments:
          </p>
          <input
            type="password"
            placeholder="Admin password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
          <button
            onClick={fetchPayments}
            disabled={!secret || loading}
            className="w-full bg-[#403F2B] text-white py-2 rounded-md hover:bg-[#29291F] transition"
          >
            {loading ? "Loading..." : "View Payments"}
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Search by name, email, or referral"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md flex-1 min-w-[200px]"
            />
            <div className="flex items-center gap-2">
              <label className="text-gray-600 text-sm">From:</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-600 text-sm">To:</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-md"
              />
            </div>

            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              ⬇️ Export CSV
            </button>

            <button
              onClick={() => {
                setPayments([]);
                setSecret("");
              }}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-md">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-[#403F2B] text-white">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Referral</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.reference} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(p.created_at).toLocaleString()}
                    </td>
                    <td className="p-3">{p.email}</td>
                    <td className="p-3">₦{p.amount}</td>
                    <td className="p-3">{p.referral_code}</td>
                    <td className="p-3">{p.status}</td>
                    <td className="p-3">{p.full_name || "-"}</td>
                    <td className="p-3">{p.phone || "-"}</td>
                    <td className="p-3">{p.address || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-6">
                No results match your filters.
              </p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
