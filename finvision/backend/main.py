from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {"message": "FinVision chatbot backend running"}


@app.post("/chat")
async def chat(req: ChatRequest):

    try:

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            max_tokens=40,
            temperature=0.3,
            messages=[
                {
                    "role": "system",
                    "content": """
You are FinVision AI, a financial education assistant.

Rules:
- Answer in ONE short sentence.
- Maximum 25 words.
- Use simple beginner language.
- Topics: SIP, investing, compounding, inflation, savings.
- Never give long explanations.
"""
                },
                {
                    "role": "user",
                    "content": req.message
                }
            ]
        )

        reply = completion.choices[0].message.content.strip()

        return {"reply": reply}

    except Exception as e:
        return {"reply": "Sorry, FinVision AI is temporarily unavailable."}