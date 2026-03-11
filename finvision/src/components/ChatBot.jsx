import { useState, useRef, useEffect } from "react";

export default function ChatBot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };

    setChat(prev => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {

      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      const botMsg = {
        sender: "bot",
        text: data.reply
      };

      setChat(prev => [...prev, botMsg]);

    } catch {

      setChat(prev => [
        ...prev,
        { sender: "bot", text: "FinVision AI unavailable." }
      ]);

    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (

    <>

      {/* Floating Button */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl hover:scale-105 transition"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}

      {open && (

        <div className="fixed bottom-6 right-6 w-[320px] h-[380px] resize overflow-auto bg-slate-900 text-white rounded-xl shadow-2xl flex flex-col border border-slate-700 min-w-[260px] min-h-[300px]">

          {/* Header */}

          <div className="flex justify-between items-center bg-slate-800 p-3 rounded-t-xl">

            <span className="font-semibold">
              🤖 FinVision AI
            </span>

            <button onClick={() => setOpen(false)}>
              ✕
            </button>

          </div>

          {/* Chat Messages */}

          <div className="flex-1 overflow-y-auto p-3 space-y-2">

            {chat.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                    msg.sender === "user"
                      ? "bg-blue-600"
                      : "bg-slate-700"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {loading && (
              <p className="text-gray-400 text-sm">
                FinVision AI is typing...
              </p>
            )}

            <div ref={chatEndRef} />

          </div>

          {/* Input */}

          <div className="border-t border-slate-700 p-3 flex gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about SIP, inflation..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 text-sm"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </>

  );

}