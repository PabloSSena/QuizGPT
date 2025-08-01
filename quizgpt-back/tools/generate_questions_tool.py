def get_question_tool_schema():
    return [
        {
            "type": "function",
            "name": "generate_questions",
            "description": "Generates 10 multiple-choice questions from a document",
            "parameters": {
                "type": "object",
                "properties": {
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {"type": "string"},
                                "question": {"type": "string"},
                                "options": {
                                    "type": "array",
                                    "items": {"type": "string"},
                                    "minItems": 4,
                                    "maxItems": 4
                                },
                                "correct_answer": {"type": "integer"},
                                "explanation": {"type": "string"}
                            },
                            "required": ["id","question", "options", "correct_answer", "explanation"]
                        },
                        "minItems": 10,
                        "maxItems": 10
                    }
                },
                "required": ["questions"]
            }
        }
    ]
