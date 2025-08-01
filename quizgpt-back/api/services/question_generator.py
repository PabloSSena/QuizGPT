import json

from fastapi.responses import JSONResponse

from config.openai_config import AIClient
from prompts.generate_questions import get_question_prompt
from schemas.question import Question
from tools.generate_questions_tool import get_question_tool_schema


def generate_questions(content: str) -> list[Question]:
    prompt = get_question_prompt(content)
    tools = get_question_tool_schema()

    response = AIClient.responses.create(
        model="gpt-4o",
        input=[{"role": "user", "content": prompt}],
        tools=tools,
        temperature=0.7
    )
    arguments = response.output[0].arguments
    questions_data = json.loads(arguments)["questions"]
    print(f"generate_questions - Generated questions: {questions_data}")
    return JSONResponse(
            content={"success": True, "questions": [Question(**q).dict() for q in questions_data]},
            status_code=200
        )
