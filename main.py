import os
import json
from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from prompts import (
    get_simplification_prompt,
    get_quiz_prompt,
    get_flashcards_prompt
)

load_dotenv()

app = FastAPI(
    title="EduBuddy API",
    description="Intelligent Multi-Level Student Learning Assistant",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class SimplifyRequest(BaseModel):
    topic: str
    level: str = "highschool"  # eli5, highschool, college, cheatsheet
    context: Optional[str] = ""
    api_key: Optional[str] = None

class QuizRequest(BaseModel):
    topic: str
    level: str = "highschool"
    api_key: Optional[str] = None

class FlashcardsRequest(BaseModel):
    topic: str
    api_key: Optional[str] = None

# Mock Fallbacks for Offline / Hackathon Demo Reliability
PRESET_DATA = {
    "quantum computing": {
        "title": "Quantum Computing & Superposition",
        "level": "eli5",
        "tldr": "While normal computers use bits that are either 0 or 1, quantum computers use qubits that can explore both at the same time until measured.",
        "analogy": "Imagine a spinning coin on a table. While it's spinning, it is both Heads and Tails simultaneously. Only when you slap your hand down does it become one or the other. Normal computers only deal with coins flat on the table.",
        "breakdown": [
            {
                "subheading": "1. Bits vs Qubits",
                "explanation": "A regular bit is a light switch (ON or OFF). A qubit is a sphere where the state can point anywhere in 3D space."
            },
            {
                "subheading": "2. Superposition",
                "explanation": "This allows a quantum computer to test trillions of possibilities at once instead of one by one."
            },
            {
                "subheading": "3. Entanglement",
                "explanation": "Two particles linked across space—altering one instantly affects the other, enabling super-fast synchronized computations."
            }
        ],
        "common_misconception": "Quantum computers are not just faster laptops for gaming; they are specialized machines designed for massive combinatorics like drug discovery and cryptography.",
        "real_world_application": "Simulating complex molecular structures to design cancer medications in days instead of decades.",
        "memory_tip": "Think 'SPIN': Superposition, Particles entangled, Instant calculation, Next-gen science."
    }
}

def call_gemini(prompt: str, custom_key: Optional[str] = None) -> dict:
    api_key = custom_key or os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail="Missing GEMINI_API_KEY. Please provide it in the request or .env file."
        )

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.3
            )
        )
        return json.loads(response.text)
    except Exception as e:
        # Fallback parsing in case response contains markdown codeblock
        try:
            cleaned = response.text.strip()
            if cleaned.startswith("```json"):
                cleaned = cleaned[7:-3].strip()
            elif cleaned.startswith("```"):
                cleaned = cleaned[3:-3].strip()
            return json.loads(cleaned)
        except Exception:
            raise HTTPException(status_code=500, detail=f"AI generation failed: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "EduBuddy Student Learning Assistant"}

@app.post("/api/simplify")
def simplify_topic(req: SimplifyRequest):
    # Check if user requests known preset or wants dynamic AI
    if not req.api_key and not os.getenv("GEMINI_API_KEY"):
        # Graceful fallback for offline demo
        key = req.topic.lower().strip()
        for preset_name, data in PRESET_DATA.items():
            if preset_name in key:
                data_copy = dict(data)
                data_copy["level"] = req.level
                return data_copy

    prompt = get_simplification_prompt(req.topic, req.level, req.context)
    return call_gemini(prompt, req.api_key)

@app.post("/api/quiz")
def generate_quiz(req: QuizRequest):
    if not req.api_key and not os.getenv("GEMINI_API_KEY"):
        return {
            "topic": req.topic,
            "questions": [
                {
                    "id": 1,
                    "question": f"What is the fundamental difference between classical bits and qubits in {req.topic}?",
                    "options": [
                        "Qubits can exist in a superposition of states (both 0 and 1)",
                        "Qubits are simply smaller copper wires",
                        "Classical bits run at a higher clock frequency",
                        "Qubits only store text data"
                    ],
                    "correct_index": 0,
                    "explanation": "Qubits leverage quantum superposition, enabling them to evaluate complex combinations simultaneously.",
                    "misconception_feedback": "Remember: Quantum advantage comes from mathematical superposition and entanglement, not physical wire miniaturization."
                },
                {
                    "id": 2,
                    "question": "When does a quantum system collapse into a single definite classical state?",
                    "options": [
                        "When it reaches high temperatures",
                        "Upon measurement or environmental observation",
                        "Every 60 seconds automatically",
                        "Only when power is turned off"
                    ],
                    "correct_index": 1,
                    "explanation": "Wave function collapse occurs during measurement, resolving probabilities into a concrete classical value.",
                    "misconception_feedback": "Quantum states don't collapse on a timer; quantum decoherence happens through interaction with the external environment or detector."
                }
            ]
        }

    prompt = get_quiz_prompt(req.topic, req.level)
    return call_gemini(prompt, req.api_key)

@app.post("/api/flashcards")
def generate_flashcards(req: FlashcardsRequest):
    prompt = get_flashcards_prompt(req.topic)
    return call_gemini(prompt, req.api_key)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
