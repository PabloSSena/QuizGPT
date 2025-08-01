# QuizGPT

QuizGPT is a web application that lets you upload a PDF and automatically generates quiz questions and answers using OpenAI's API.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Python (v3.10+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- OpenAI API key

### 1. Clone the Repository

```bash
git clone https://github.com/PabloSSena/QuizGPT
cd QuizGPT
```

### 2. Install Frontend Dependencies

```bash
cd quizgpt
npm install
# or
yarn install
```

### 3. Install Backend Dependencies

```bash
cd quizgpt-back
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in `quizgpt-back` based on `.env.example` and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key
```

### 5. Run the Backend (FastAPI)

```bash
cd quizgpt-back
uvicorn main:app --reload
```

The backend will start at `http://127.0.0.1:8000`.

### 6. Run the Frontend (Next.js)

```bash
cd quizgpt
npm run dev
# or
yarn dev
```

The frontend will start at `http://localhost:3000`.

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Upload a PDF document.
3. Wait for the questions to be generated.
4. Edit questions if needed, then start the quiz.

## Technologies

- Next.js (React)
- FastAPI (Python)
- OpenAI API
- Tailwind CSS
