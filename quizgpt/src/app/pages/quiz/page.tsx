"use client";

import { useHandleQuizInteractions } from "@/app/hooks/use_handle_quiz_interactions.hook";
import { useDocumentInteractionStore } from "@/app/stores/document_interaction.store";
import { useQuestionsStore } from "@/app/stores/questions.store";
import { useQuizResultStore } from "@/app/stores/quiz_result.store";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function QuizPage() {
  const { file } = useDocumentInteractionStore();
  const { questions } = useQuestionsStore();
  const {
    allQuestionsAnswered,
    answeredQuestions,
    currentQ,
    currentQuestion,
    goToQuestion,
    handleAnswerChange,
    nextQuestion,
    previousQuestion,
    progress,
    selectedAnswer,
    timeElapsedAux,
    answersAux,
  } = useHandleQuizInteractions(questions);

  const {
    setScore,
    setPercentage,
    setTimeElapsed,
    setTotalQuestions,
    setAnswers,
  } = useQuizResultStore();

  const submitQuiz = () => {
    let correctAnsweCouter = 0;
    questions.forEach((question) => {
      const userAnswer = answersAux[question.id];
      if (question.correct_answer === userAnswer) {
        correctAnsweCouter++;
      }
    });

    const answerArray: IQuizAnswer[] = questions.map((question) => ({
      questionId: question.id,
      question: question.question,
      options: question.options,
      userAnswer: answersAux[question.id],
      correctAnswer: question.correct_answer,
      isCorrect: question.correct_answer === answersAux[question.id],
      explanation: question.explanation,
    }));

    setScore(correctAnsweCouter);
    setPercentage(Math.round((correctAnsweCouter / questions.length) * 100));
    setTimeElapsed(timeElapsedAux);
    setTotalQuestions(questions.length);
    setAnswers(answerArray);
    redirect("/pages/results");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <p className="text-gray-600 mb-4">
            No questions found. Please come back later.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Quiz - {file?.name}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-mono text-lg">
                  {formatTime(timeElapsedAux)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress: {Math.round(progress)}%</span>
            <span>
              Answered: {answeredQuestions}/{questions.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Question {currentQuestion + 1}
                </h2>
              </div>

              <div className="px-6 py-6">
                <div className="mb-8">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {currentQ?.question}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentQ?.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAnswer === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => handleAnswerChange(index)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-start">
                          <span className="font-semibold text-gray-700 mr-3 min-w-[24px]">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="text-gray-800">{option}</span>
                        </div>
                      </div>
                      {selectedAnswer === index && (
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-1 ml-2" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={submitQuiz}
                    disabled={!allQuestionsAnswered}
                    className="flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Flag className="mr-2 h-4 w-4" />
                    "Submit Quiz"
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
              <div className="px-4 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Navigation
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click to navigate to a question
                </p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`aspect-square flex items-center justify-center text-sm font-medium rounded-md border-2 transition-all duration-200 ${
                        currentQuestion === index
                          ? "border-blue-500 bg-blue-600 text-white"
                          : answersAux[questions[index].id] !== undefined
                          ? "border-green-500 bg-green-100 text-green-800 hover:bg-green-200"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                    <span className="text-gray-600">Current question</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 border border-green-500 rounded mr-2"></div>
                    <span className="text-gray-600">Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                    <span className="text-gray-600">Not answered</span>
                  </div>
                </div>
              </div>

              <div className="px-4 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-semibold">{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Answered:</span>
                    <span className="font-semibold text-green-600">
                      {answeredQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold text-orange-600">
                      {questions.length - answeredQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold font-mono">
                      {formatTime(timeElapsedAux)}
                    </span>
                  </div>
                </div>

                {allQuestionsAnswered && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-md">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">
                        All questions answered!
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
