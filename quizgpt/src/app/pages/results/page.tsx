"use client";

import { useHandleReslts } from "@/app/hooks/use_handle_results.hook";
import { useQuizResultStore } from "@/app/stores/quiz_result.store";
import {
  CheckCircle,
  Clock,
  Home,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function ResultsPage() {
  const [showExplanations, setShowExplanations] = useState(true);
  const { answers, percentage, score, timeElapsed, totalQuestions } =
    useQuizResultStore();

  const { formatTime, getScoreColor, getScoreBgColor, getPerformanceMessage } =
    useHandleReslts();

  const performance = getPerformanceMessage(percentage);
  const PerformanceIcon = performance.icon;
  const retakeQuiz = () => {
    redirect("/pages/quiz");
  };

  const goHome = () => {
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Results
          </h1>
        </div>

        <div
          className={`rounded-lg border-2 p-8 mb-8 ${getScoreBgColor(
            percentage
          )}`}
        >
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <PerformanceIcon
                className={`h-16 w-16 ${getScoreColor(percentage)}`}
              />
            </div>
            <div
              className={`text-6xl font-bold mb-2 ${getScoreColor(percentage)}`}
            >
              {percentage}%
            </div>
            <div className="text-xl text-gray-700 mb-2">
              {score} out of {totalQuestions} correct answers
            </div>
            <div
              className={`text-lg font-semibold ${getScoreColor(percentage)}`}
            >
              {performance.message}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{score}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-2">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              {totalQuestions - score}
            </div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-2">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {percentage}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {formatTime(timeElapsed)}
            </div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <button
              style={{ cursor: "pointer" }}
              onClick={goHome}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="mr-2 h-4 w-4" />
              New Quiz
            </button>
            <button
              style={{ cursor: "pointer" }}
              onClick={retakeQuiz}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </button>
          </div>

          <button
            onClick={() => setShowExplanations(!showExplanations)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showExplanations ? "Hide" : "Show"} Explanations
          </button>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Detailed Review
          </h2>

          {answers.map((answer, index) => (
            <div
              key={answer.questionId}
              className={`bg-white rounded-lg shadow-sm border-l-4 ${
                answer.isCorrect ? "border-l-green-500" : "border-l-red-500"
              } border-r border-t border-b border-gray-200`}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Question {index + 1}
                    </h3>
                    {answer.isCorrect ? (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Correct
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Incorrect
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{answer.question}</p>
              </div>

              <div className="px-6 py-4">
                <div className="space-y-3">
                  {answer.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-4 rounded-lg border-2 ${
                        optionIndex === answer.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : optionIndex === answer.userAnswer &&
                            !answer.isCorrect
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-700 min-w-[24px]">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span
                            className={
                              optionIndex === answer.correctAnswer
                                ? "text-green-800 font-medium"
                                : optionIndex === answer.userAnswer &&
                                  !answer.isCorrect
                                ? "text-red-800"
                                : "text-gray-800"
                            }
                          >
                            {option}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {optionIndex === answer.correctAnswer && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-xs font-medium text-green-700">
                                Correct Answer
                              </span>
                            </div>
                          )}
                          {optionIndex === answer.userAnswer &&
                            !answer.isCorrect && (
                              <div className="flex items-center gap-1">
                                <XCircle className="h-4 w-4 text-red-600" />
                                <span className="text-xs font-medium text-red-700">
                                  Your Answer
                                </span>
                              </div>
                            )}
                          {optionIndex === answer.userAnswer &&
                            answer.isCorrect && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-xs font-medium text-green-700">
                                  Your Answer
                                </span>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {showExplanations && answer.explanation && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Explanation:
                        </h4>
                        <p className="text-blue-800 leading-relaxed">
                          {answer.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={goHome}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home className="mr-2 h-4 w-4" />
            Create New Quiz
          </button>
          <button
            onClick={retakeQuiz}
            className="flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake This Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
