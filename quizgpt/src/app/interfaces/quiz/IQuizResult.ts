interface IQuizAnswer {
  questionId: string;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

interface IQuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeElapsed: number;
  answers: IQuizAnswer[];
}
