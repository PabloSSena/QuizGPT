import io
import logging
from fastapi import APIRouter, File, HTTPException, UploadFile
import pdfplumber
from openai import OpenAI

from api.services.question_generator import generate_questions
from utils.turn_pdf_into_text import turn_pdf_into_text


router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/create_questions")
async def create_questions(file: UploadFile = File(...)):
    print("/create_questions - Received request")
    if file.content_type != "application/pdf":
        logger.error("/create_questions - Invalid file type")
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are allowed.")
    try:
        content = await turn_pdf_into_text(file)
        return generate_questions(content)

    except Exception as e:
        logger.error(f"/create_questions - Error processing file: {e}")
        raise HTTPException(status_code=500, detail="Error processing file")