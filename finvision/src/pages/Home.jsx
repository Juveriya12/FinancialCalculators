import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">

      <div className="max-w-6xl grid grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE TEXT */}
        <div>

          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-blue-400">FinVision</span>
          </h1>

          <p className="text-gray-300 mb-6 text-lg">
            FinVision is an interactive financial education platform that helps
            users understand how money grows over time. Using visual tools and
            simulations, users can explore concepts like SIP investing,
            compounding growth, inflation impact, and financial goal planning.
          </p>

          <p className="text-gray-400 mb-10">
            Our goal is to simplify complex financial concepts through
            interactive dashboards and simulations so that anyone can make
            smarter financial decisions.
          </p>

          <button
  onClick={() => {
    navigate("/dashboard");
  }}
  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
>
  Start Exploring
</button>

        </div>


        {/* RIGHT SIDE IMAGE */}
        <div className="flex justify-center">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135706.png"
            alt="finance"
            className="w-96 opacity-90"
          />

        </div>

      </div>

    </div>
  );
}