from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: str
    question: str
    options: List[str]
    correct_answer: int
    explanation: str

class ContentInput(BaseModel):
    content: str
