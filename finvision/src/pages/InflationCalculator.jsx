import React, { useState } from "react";
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

export default function InflationCalculator() {

  const navigate = useNavigate();

  const [currentCost, setCurrentCost] = useState(1000000);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(6);

  const futureCost =
    currentCost * Math.pow(1 + inflation / 100, years);

  const increase = futureCost - currentCost;

  const data = [];

  for (let i = 1; i <= years; i++) {

    const value =
      currentCost * Math.pow(1 + inflation / 100, i);

    data.push({
      year: i,
      value: Math.round(value)
    });

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-2">
        Inflation Impact Calculator
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        Inflation gradually increases the cost of goods and services over time.
        This tool helps you estimate how much your financial goals may cost in
        the future if prices keep rising.
      </p>


      {/* INPUT SECTION */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        {/* Current Cost */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Current Cost: ₹{currentCost.toLocaleString()}
          </label>

          <input
            type="range"
            min="100000"
            max="10000000"
            step="50000"
            value={currentCost}
            onChange={(e) => setCurrentCost(Number(e.target.value))}
            className="w-full"
          />

        </div>


        {/* Years */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Years Ahead: {years}
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


        {/* Inflation */}

        <div>

          <label className="block mb-2 font-semibold">
            Inflation Rate: {inflation}%
          </label>

          <input
            type="range"
            min="3"
            max="10"
            value={inflation}
            onChange={(e) => setInflation(Number(e.target.value))}
            className="w-full"
          />

        </div>

      </div>


      {/* RESULT CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Current Cost</p>

          <h2 className="text-2xl font-bold mt-2">
            ₹
            <CountUp end={currentCost} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Future Cost</p>

          <h2 className="text-2xl font-bold text-red-400 mt-2">
            ₹
            <CountUp end={Math.round(futureCost)} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Cost Increase</p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-2">
            ₹
            <CountUp end={Math.round(increase)} duration={2} separator="," />
          </h2>

        </div>

      </div>


      {/* KEY INSIGHT */}

      <div className="bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl mb-8">

        <h2 className="text-lg font-semibold text-blue-300 mb-2">
          Key Insight
        </h2>

        <p className="text-gray-300">

          A goal costing

          <span className="font-semibold text-white">
            {" "}₹{currentCost.toLocaleString()}
          </span>

          {" "}today could cost approximately

          <span className="font-semibold text-red-400">
            {" "}₹{Math.round(futureCost).toLocaleString()}
          </span>

          {" "}in

          <span className="font-semibold text-white">
            {" "} {years} years
          </span>

          {" "}with an inflation rate of

          <span className="font-semibold text-white">
            {" "} {inflation}%.
          </span>

        </p>

      </div>


      {/* CHART */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Cost Growth Due to Inflation
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
              stroke="#ef4444"
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
          Inflation silently reduces the purchasing power of money.
          Investing in assets that grow faster than inflation is
          important to preserve long-term wealth.
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