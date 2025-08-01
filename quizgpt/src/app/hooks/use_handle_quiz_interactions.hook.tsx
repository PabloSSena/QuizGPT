import { useState } from "react";

export const useHandleQuizInteractions = (questions: IQuestion[]) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answersAux, setAnswersAux] = useState<{ [key: string]: number }>({});
  const [timeElapsedAux, setTimeElapsedAux] = useState(0);
  const currentQ: IQuestion | null =
    questions.length > 0 ? questions[currentQuestion] : null;
  const selectedAnswer = currentQ ? answersAux[currentQ.id] : undefined;
  const answeredQuestions = Object.keys(answersAux).length;
  const progress = (answeredQuestions / questions.length) * 100;
  const allQuestionsAnswered = answeredQuestions === questions.length;

  useState(() => {
    const interval = setInterval(() => {
      setTimeElapsedAux((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleAnswerChange = (optionIndex: number) => {
    setAnswersAux((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  return {
    currentQ,
    currentQuestion,
    selectedAnswer,
    answeredQuestions,
    progress,
    allQuestionsAnswered,
    timeElapsedAux,
    handleAnswerChange,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    answersAux,
  };
};
