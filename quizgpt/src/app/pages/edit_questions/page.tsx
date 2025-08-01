"use client";

import { useHandleQuestionsInteraction } from "@/app/hooks/use_handle_questions_interaction.hook";
import { Play, Plus, Save, Trash2 } from "lucide-react";

export default function EditQuestionsPage() {
  const {
    addOption,
    addQuestion,
    questionsAux,
    removeOption,
    removeQuestion,
    saveQuestions,
    updateOption,
    updateQuestion,
    startQuiz,
  } = useHandleQuestionsInteraction();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Quiz Questions
            </h1>
            <p className="text-gray-600 mt-2">
              Review and edit the generated questions before starting the quiz
            </p>
          </div>
          <div className="flex gap-3">
            <button
              style={{ cursor: "pointer" }}
              onClick={saveQuestions}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Questions
            </button>
            <button
              style={{ cursor: "pointer" }}
              onClick={startQuiz}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Quiz
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {questionsAux.map((question, questionIndex) => (
            <div
              key={question.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              {/* Question Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Question {questionIndex + 1}
                  </h3>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 space-y-6">
                <div>
                  <label
                    htmlFor={`question-${question.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Question Text
                  </label>
                  <textarea
                    id={`question-${question.id}`}
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(question.id, "question", e.target.value)
                    }
                    placeholder="Enter your question here..."
                    rows={3}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Answer Options
                  </label>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-3"
                      >
                        <input
                          type="radio"
                          id={`${question.id}-${optionIndex}`}
                          name={`question-${question.id}`}
                          checked={question.correct_answer === optionIndex}
                          onChange={() =>
                            updateQuestion(
                              question.id,
                              "correct_answer",
                              optionIndex
                            )
                          }
                          className=" h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />

                        <label
                          htmlFor={`${question.id}-${optionIndex}`}
                          className="text-sm font-medium text-gray-700 min-w-[20px]"
                        >
                          {String.fromCharCode(65 + optionIndex)}.
                        </label>

                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOption(
                              question.id,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        />

                        {question.options.length > 2 && (
                          <button
                            onClick={() =>
                              removeOption(question.id, optionIndex)
                            }
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    {question.options.length < 6 && (
                      <button
                        onClick={() => addOption(question.id)}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Option
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`explanation-${question.id}`}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Explanation (Optional)
                  </label>
                  <textarea
                    id={`explanation-${question.id}`}
                    value={question.explanation}
                    onChange={(e) =>
                      updateQuestion(question.id, "explanation", e.target.value)
                    }
                    placeholder="Explain why this is the correct answer..."
                    rows={2}
                    className="text-black  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300">
            <div className="flex items-center justify-center py-8">
              <button
                onClick={addQuestion}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
