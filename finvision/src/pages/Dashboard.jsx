import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Percent,
  Clock,
  Target,
  BarChart3
} from "lucide-react";

export default function Dashboard() {

  const navigate = useNavigate();

  const features = [
    {
      title: "SIP Investment Simulator",
      desc: "Explore how monthly investments grow over time.",
      route: "/sip",
      icon: <TrendingUp size={30} />
    },
    {
      title: "Compounding Visualizer",
      desc: "Understand how compounding accelerates wealth.",
      route: "/compounding",
      icon: <Percent size={30} />
    },
    {
      title: "Start Early vs Late",
      desc: "Compare two investors starting at different times.",
      route: "/early",
      icon: <Clock size={30} />
    },
    {
      title: "Goal Planner",
      desc: "Plan investments to reach financial goals.",
      route: "/goal",
      icon: <Target size={30} />
    },
    {
      title: "Inflation Calculator",
      desc: "See how inflation impacts future money.",
      route: "/inflation",
      icon: <BarChart3 size={30} />
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-10">

      {/* Hero Section */}

      <div className="mb-14">

        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          FinVision Dashboard
        </h1>

        <p className="text-gray-400 max-w-xl">
          Learn financial concepts interactively. Simulate investments,
          visualize compounding, and understand the real impact of inflation.
        </p>

      </div>


      {/* Feature Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((feature, index) => (

          <div
            key={index}
            onClick={() => navigate(feature.route)}

            className="
            group
            cursor-pointer
            bg-slate-800/40
            backdrop-blur-lg
            border border-slate-700
            p-7
            rounded-2xl
            hover:border-blue-500
            hover:scale-105
            transition
            duration-300
            shadow-xl
            "
          >

            {/* Icon */}

            <div className="mb-4 text-blue-400 group-hover:scale-110 transition">
              {feature.icon}
            </div>

            {/* Title */}

            <h2 className="text-xl font-semibold mb-2">
              {feature.title}
            </h2>

            {/* Description */}

            <p className="text-gray-400 text-sm">
              {feature.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}