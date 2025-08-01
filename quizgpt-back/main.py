from typing import Union

from fastapi import FastAPI
from api.routes.create_questions import router as CreateQuestionsRouter
app = FastAPI()

app.include_router(CreateQuestionsRouter, prefix="/api", tags=["create_questions"])