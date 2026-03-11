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
  ResponsiveContainer
} from "recharts";

export default function CompoundingVisualizer() {

  const navigate = useNavigate();

  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(10);

  const data = [];

  let value = initialInvestment;

  for (let i = 1; i <= years; i++) {

    value = value * (1 + rate / 100);

    data.push({
      year: i,
      value: Math.round(value)
    });

  }

  const finalValue = data[data.length - 1]?.value || initialInvestment;
  const profit = finalValue - initialInvestment;

  /* SIMPLE INTEREST COMPARISON */

  const simpleInterestValue =
    initialInvestment + (initialInvestment * rate * years) / 100;

  const extraGain = finalValue - simpleInterestValue;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-2">
        Compounding Visualizer
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        Compounding is the process where your investment returns begin generating
        their own returns. Over time this creates a snowball effect, allowing
        investments to grow exponentially rather than linearly.
      </p>


      {/* INPUT SECTION */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        {/* Initial Investment */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Initial Investment: ₹{initialInvestment}
          </label>

          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(Number(e.target.value))}
            className="w-full"
          />

        </div>

        {/* Years */}

        <div className="mb-6">

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

        {/* Rate */}

        <div>

          <label className="block mb-2 font-semibold">
            Annual Return: {rate}%
          </label>

          <input
            type="range"
            min="5"
            max="15"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
          />

        </div>

      </div>


      {/* RESULT CARDS */}

      <div className="grid md:grid-cols-2 gap-6 mb-12">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Final Value</p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">
            ₹
            <CountUp
              end={finalValue}
              duration={2}
              separator=","
            />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Total Profit</p>

          <h2 className="text-2xl font-bold text-blue-400 mt-2">
            ₹
            <CountUp
              end={profit}
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

          An investment of ₹{initialInvestment.toLocaleString()} growing at
          {rate}% annually for {years} years could reach approximately
          ₹{finalValue.toLocaleString()}.

          Unlike simple interest, compounding allows each year's earnings
          to generate additional returns in future years.

        </p>

      </div>


      {/* COMPOUNDING ADVANTAGE */}

      <div className="bg-green-900/30 border border-green-500/30 p-6 rounded-xl mb-12">

        <h2 className="text-lg font-semibold text-green-300 mb-2">
          Compounding Advantage
        </h2>

        <p className="text-gray-300">

          If the same investment used simple interest, it would grow to only

          <span className="text-white font-semibold">
            {" "}₹{Math.round(simpleInterestValue).toLocaleString()}
          </span>.

          Compounding adds approximately

          <span className="text-green-400 font-semibold">
            {" "}₹{Math.round(extraGain).toLocaleString()}
          </span>

          {" "}more to your wealth.

        </p>

      </div>


      {/* CHART */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Compounding Growth Over Time
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


      {/* FINANCIAL TIP */}

      <div className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-xl mb-12">

        <h2 className="text-lg font-semibold text-purple-300 mb-2">
          💡 Financial Tip
        </h2>

        <p className="text-gray-300">
          Time is the most powerful factor in compounding. The longer your
          money stays invested, the more opportunities it has to grow through
          reinvested returns.
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