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

export default function GoalPlanner() {

  const navigate = useNavigate();

  const [goal, setGoal] = useState(1000000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const months = years * 12;
  const r = rate / 100 / 12;

  /* SIP REQUIRED TO REACH GOAL */

  const sip =
    goal / (((Math.pow(1 + r, months) - 1) / r) * (1 + r));

  const totalInvested = sip * months;
  const returns = goal - totalInvested;

  /* GROWTH DATA */

  const data = [];

  for (let i = 1; i <= years; i++) {

    const m = i * 12;

    const value =
      sip * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);

    data.push({
      year: i,
      value: Math.round(value)
    });

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10">

      {/* TITLE */}

      <h1 className="text-3xl font-bold mb-2">
        Investment Goal Planner
      </h1>

      <p className="text-gray-400 mb-10 max-w-3xl">
        Plan your financial goals by estimating how much you need to invest
        every month. Adjust the goal amount, time horizon, and expected
        return to see how your investment grows toward your target.
      </p>


      {/* INPUT SECTION */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        {/* Goal */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Target Goal: ₹{goal.toLocaleString()}
          </label>

          <input
            type="range"
            min="100000"
            max="10000000"
            step="50000"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full"
          />

        </div>


        {/* Years */}

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Time Horizon: {years} Years
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
            Expected Return: {rate}%
          </label>

          <input
            type="range"
            min="6"
            max="15"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full"
          />

        </div>

      </div>


      {/* RESULT CARDS */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Monthly Investment Required</p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">
            ₹
            <CountUp end={Math.round(sip)} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Total Invested</p>

          <h2 className="text-2xl font-bold mt-2">
            ₹
            <CountUp end={Math.round(totalInvested)} duration={2} separator="," />
          </h2>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg text-center">

          <p className="text-gray-400">Expected Returns</p>

          <h2 className="text-2xl font-bold text-blue-400 mt-2">
            ₹
            <CountUp end={Math.round(returns)} duration={2} separator="," />
          </h2>

        </div>

      </div>


      {/* KEY INSIGHT */}

      <div className="bg-blue-900/30 border border-blue-500/30 p-6 rounded-xl mb-8">

        <h2 className="text-lg font-semibold text-blue-300 mb-2">
          Key Insight
        </h2>

        <p className="text-gray-300">

          To achieve a financial goal of

          <span className="font-semibold text-white">
            {" "}₹{goal.toLocaleString()}
          </span>

          {" "}within

          <span className="font-semibold text-white">
            {" "} {years} years
          </span>,

          {" "}you would need to invest approximately

          <span className="font-semibold text-green-400">
            {" "}₹{Math.round(sip).toLocaleString()}
          </span>

          {" "}every month assuming a

          <span className="font-semibold text-white">
            {" "} {rate}% annual return.
          </span>

        </p>

      </div>


      {/* CHART */}

      <div className="bg-slate-800 p-6 rounded-xl shadow-lg mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Investment Growth Towards Goal
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
          Breaking big financial goals into small monthly investments
          makes them more achievable. Starting earlier reduces the
          monthly amount required because compounding has more time
          to work.
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