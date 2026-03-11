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
  ResponsiveContainer,
  Legend
} from "recharts";

export default function EarlyVsLate() {

  const navigate = useNavigate();

  const [monthly, setMonthly] = useState(5000);
  const [earlyAge, setEarlyAge] = useState(22);
  const [lateAge, setLateAge] = useState(32);

  const retirementAge = 60;
  const rate = 12;

  const years = retirementAge - earlyAge;
  const r = rate / 100 / 12;

  const data = [];

  for (let i = 1; i <= years; i++) {

    const earlyMonths = i * 12;

    const earlyValue =
      monthly * ((Math.pow(1 + r, earlyMonths) - 1) / r) * (1 + r);

    const lateYears = Math.max(i - (lateAge - earlyAge), 0);
    const lateMonths = lateYears * 12;

    const lateValue =
      lateMonths > 0
        ? monthly * ((Math.pow(1 + r, lateMonths) - 1) / r) * (1 + r)
        : 0;

    data.push({
      year: earlyAge + i,
      early: Math.round(earlyValue),
      late: Math.round(lateValue)
    });

  }

  const earlyFinal = data[data.length - 1]?.early || 0;
  const lateFinal = data[data.length - 1]?.late || 0;
  const difference = earlyFinal - lateFinal;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-2">
        Start Early vs Late
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        This simulation compares two investors who invest the same monthly
        amount but start at different ages. The earlier investor benefits
        from more years of compounding, which can dramatically increase
        wealth by retirement.
      </p>


      {/* INPUT SECTION */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        {/* Monthly Investment */}

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

        {/* Early Age */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Early Start Age: {earlyAge}
          </label>

          <input
            type="range"
            min="18"
            max="40"
            value={earlyAge}
            onChange={(e) => setEarlyAge(Number(e.target.value))}
            className="w-full"
          />

        </div>

        {/* Late Age */}

        <div>

          <label className="block mb-2 font-semibold">
            Late Start Age: {lateAge}
          </label>

          <input
            type="range"
            min="20"
            max="50"
            value={lateAge}
            onChange={(e) => setLateAge(Number(e.target.value))}
            className="w-full"
          />

        </div>

      </div>


      {/* RESULT CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Start Early Wealth</p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">
            ₹
            <CountUp end={earlyFinal} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Start Late Wealth</p>

          <h2 className="text-2xl font-bold text-blue-400 mt-2">
            ₹
            <CountUp end={lateFinal} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center shadow-lg">

          <p className="text-gray-400">Extra Wealth by Starting Early</p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-2">
            ₹
            <CountUp end={difference} duration={2} separator="," />
          </h2>

        </div>

      </div>


      {/* KEY INSIGHT */}

      <div className="bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl mb-8">

        <h2 className="text-lg font-semibold text-blue-300 mb-2">
          Key Insight
        </h2>

        <p className="text-gray-300">
          Even though both investors contribute the same amount every
          month, the one who starts at age {earlyAge} benefits from
          additional years of compounding. By retirement, this creates
          a wealth gap of approximately ₹{difference.toLocaleString()}.
        </p>

      </div>


      {/* CHART */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Investment Growth Comparison
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

            <XAxis dataKey="year" stroke="#94a3b8" />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none"
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="early"
              stroke="#22c55e"
              strokeWidth={3}
              name="Start Early"
            />

            <Line
              type="monotone"
              dataKey="late"
              stroke="#3b82f6"
              strokeWidth={3}
              name="Start Late"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* FINANCIAL TIP */}

      <div className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl mb-12">

        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          💡 Financial Tip
        </h2>

        <p className="text-gray-300">
          In investing, time is more powerful than contribution size.
          Starting even a few years earlier can dramatically increase
          your final wealth due to compounding.
        </p>

      </div>


      {/* BACK BUTTON */}

      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
      >
        ← Back
      </button>

    </div>
  );
}