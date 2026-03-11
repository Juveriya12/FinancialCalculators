import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

export default function SipSimulator() {

  const navigate = useNavigate();

  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(20);

  const rate = 12;

  const r = rate / 100 / 12;
  const months = years * 12;

  const futureValue =
    monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

  const totalInvested = monthly * months;
  const profit = futureValue - totalInvested;

  /* EARLY VS LATE COMPARISON */

  const earlyMonths = years * 12;
  const lateMonths = (years - 5) * 12;

  const earlyValue =
    monthly * ((Math.pow(1 + r, earlyMonths) - 1) / r) * (1 + r);

  const lateValue =
    monthly * ((Math.pow(1 + r, lateMonths) - 1) / r) * (1 + r);

  const difference = earlyValue - lateValue;

  /* GROWTH DATA */

  const growthData = [];

  for (let i = 1; i <= years; i++) {

    const m = i * 12;

    const value =
      monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);

    growthData.push({
      year: i,
      value: Math.round(value)
    });
  }

  const pieData = [
    { name: "Invested Amount", value: totalInvested },
    { name: "Profit Earned", value: profit }
  ];

  const COLORS = ["#3b82f6", "#22c55e"];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-2">
        SIP Investment Simulator
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        Systematic Investment Plans (SIP) allow you to invest a fixed amount
        every month and benefit from compounding over time. Even small,
        consistent investments can grow into significant wealth when given
        enough time.
      </p>


      {/* INPUT SECTION */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Monthly Investment: ₹{monthly}
          </label>

          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Investment Duration: {years} Years
          </label>

          <input
            type="range"
            min="5"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />

        </div>

      </div>


      {/* RESULT CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Total Invested</p>

          <h2 className="text-2xl font-bold mt-2">

            ₹
            <CountUp
              end={Math.round(totalInvested)}
              duration={2}
              separator=","
            />

          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Future Value</p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">

            ₹
            <CountUp
              end={Math.round(futureValue)}
              duration={2}
              separator=","
            />

          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Total Profit</p>

          <h2 className="text-2xl font-bold text-blue-400 mt-2">

            ₹
            <CountUp
              end={Math.round(profit)}
              duration={2}
              separator=","
            />

          </h2>

        </div>

      </div>


      {/* KEY INSIGHT */}

      <div className="bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl mb-8">

        <h2 className="text-lg font-semibold text-blue-300 mb-2">
          Key Insight
        </h2>

        <p className="text-gray-300">

          Investing ₹{monthly} every month for {years} years means you invest
          a total of ₹{Math.round(totalInvested).toLocaleString()}.
          With compounding at 12%, this could grow to around
          ₹{Math.round(futureValue).toLocaleString()}.

        </p>

      </div>


      {/* EARLY VS LATE INSIGHT */}

      <div className="bg-green-900/30 border border-green-500/30 p-6 rounded-xl mb-12">

        <h2 className="text-lg font-semibold text-green-300 mb-2">
          Start Early Advantage
        </h2>

        <p className="text-gray-300">

          Starting your SIP just <span className="font-semibold">5 years earlier</span>
          {" "}could add approximately

          <span className="text-green-400 font-semibold">
            {" "}₹{Math.round(difference).toLocaleString()}
          </span>

          {" "}more to your wealth due to the power of compounding.

        </p>

      </div>


      {/* CHARTS */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Investment Growth Over Time
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <LineChart data={growthData}>

              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

              <XAxis dataKey="year" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none"
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* PIE CHART */}

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            Investment Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={130}
                innerRadius={60}
                label
              >

                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none"
                }}
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* FINANCIAL TIP */}

      <div className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl mt-12">

        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          💡 Financial Tip
        </h2>

        <p className="text-gray-300">
          Consistency matters more than timing the market. Investing regularly
          through SIPs helps you build wealth gradually and reduces the impact
          of market volatility.
        </p>

      </div>


      {/* BACK BUTTON */}

      <div className="mt-10">

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition"
        >
          ← Back
        </button>

      </div>

    </div>
  );
}