import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import SipSimulator from "../pages/SipSimulator";
import CompoundingVisualizer from "../pages/CompoundingVisualizer";
import GoalPlanner from "../pages/GoalPlanner";
import InflationCalculator from "../pages/InflationCalculator";
import EarlyVsLate from "../pages/EarlyVsLate";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sip" element={<SipSimulator />} />
        <Route path="/compounding" element={<CompoundingVisualizer />} />
        <Route path="/goal" element={<GoalPlanner />} />
        <Route path="/inflation" element={<InflationCalculator />} />
        <Route path="/early" element ={<EarlyVsLate />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;