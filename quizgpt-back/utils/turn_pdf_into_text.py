import io
from fastapi import File, HTTPException, UploadFile, logger
import pdfplumber


async def turn_pdf_into_text(file: UploadFile = File(...)):
    print("/create_questions - Start processing file")
    content = ""
    with pdfplumber.open(io.BytesIO(await file.read())) as pdf:
        for page in pdf.pages:
            content += page.extract_text() or ""
    print("/create_questions - Finished processing file")

    if not content.strip():
        logger.error("/create_questions - No text found in PDF")
        raise HTTPException(status_code=400, detail="No text found in PDF")
    return content