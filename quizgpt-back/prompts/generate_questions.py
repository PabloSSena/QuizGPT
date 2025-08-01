def get_question_prompt(content: str) -> str:
    return f"""
Analyze the following text and generate exactly 10 multiple-choice questions based on its content. Each question should:
1. Be clear and specific
2. Have exactly 4 answer options
3. Have only one correct answer
4. Include a brief explanation for the correct answer
5. Cover different topics/sections from the document
6. Be at an appropriate difficulty level for someone studying this material

Return the questions using the JSON format defined by the function schema.

Text:
{content}
"""
