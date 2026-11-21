"""
EduBuddy AI - Prompt Engineering & Structured Response Templates
"""

LEVEL_INSTRUCTIONS = {
    "eli5": (
        "Explain this concept as if talking to a 10-year-old or someone with zero background. "
        "Use a fun, intuitive everyday analogy (like pizza, video games, or traffic). "
        "Strictly avoid heavy technical jargon or explain terms using simple metaphors."
    ),
    "highschool": (
        "Explain this concept for a high school or introductory student. "
        "Define the core terms clearly, explain the basic mechanisms step-by-step, "
        "and provide simple real-world applications."
    ),
    "college": (
        "Explain this concept for an undergraduate or technical student. "
        "Include rigorous definitions, underlying mathematical or architectural principles, "
        "trade-offs, algorithmic flow, and real-world system implementations."
    ),
    "cheatsheet": (
        "Provide a high-density, rapid-revision exam cheat sheet. "
        "Include: 1) One-line TL;DR, 2) Key formulas or rules, 3) 3-4 bullet-point key takeaways, "
        "4) Common exam pitfalls and a memorable mnemonic."
    )
}

def get_simplification_prompt(topic: str, level: str, context: str = "") -> str:
    level_instruction = LEVEL_INSTRUCTIONS.get(level.lower(), LEVEL_INSTRUCTIONS["highschool"])
    context_part = f"\nAdditional Context/Syllabus Notes: {context}" if context else ""

    return f"""You are EduBuddy, an expert pedagogical AI designed to help students deeply master complex topics.

TOPIC: {topic}
TARGET LEARNING LEVEL: {level.upper()}
{context_part}

PEDAGOGICAL GOAL:
{level_instruction}

Return your response in valid JSON matching this schema:
{{
  "title": "{topic}",
  "level": "{level}",
  "tldr": "A 1-2 sentence crystal clear summary.",
  "analogy": "A relatable real-world comparison or metaphor explaining the core intuition.",
  "breakdown": [
    {{
      "subheading": "Key mechanism or concept step",
      "explanation": "Clear explanation adapted to the requested level."
    }}
  ],
  "common_misconception": "A common mistake students make regarding this topic and why it is wrong.",
  "real_world_application": "Where this is used in modern science, industry, or everyday life.",
  "memory_tip": "A quick mnemonic or mental anchor to remember this easily."
}}
"""

def get_quiz_prompt(topic: str, level: str) -> str:
    return f"""You are an expert tutor creating a formative assessment for a student studying: {topic} at {level} level.

Create 3 multiple-choice questions that test deep conceptual understanding and active recall (avoid shallow rote memorization).
Crucially, for EACH option, provide the diagnostic explanation so the student learns immediately from both correct and incorrect choices.

Return your response in valid JSON matching this schema:
{{
  "topic": "{topic}",
  "questions": [
    {{
      "id": 1,
      "question": "The question text",
      "options": [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text"
      ],
      "correct_index": 0,
      "explanation": "Why this option is correct.",
      "misconception_feedback": "If an incorrect option is chosen, explain the common logical error behind it."
    }}
  ]
}}
"""

def get_flashcards_prompt(topic: str) -> str:
    return f"""Create 4 high-yield active recall flashcards for: {topic}.

Return in valid JSON matching this schema:
{{
  "topic": "{topic}",
  "flashcards": [
    {{
      "front": "Prompt or Question",
      "back": "Concise, punchy answer with key mental model."
    }}
  ]
}}
"""
