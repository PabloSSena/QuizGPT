"use client";

import { FileText, Loader2, Upload, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Cards from "./components/Header/cards";
import useCreateQuestions from "./hooks/use_create_questions.hook";
import { useHandleDocumentInteraction } from "./hooks/use_handle_document_interaction.hook";

export default function Component() {
  const {
    file,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragOver,
    handleFileSelect,
    removeFile,
    formatFileSize,
  } = useHandleDocumentInteraction();

  const {
    mutate: createQuestions,
    isPending,
    isSuccess,
  } = useCreateQuestions();

  const handleProcessPDF = async () => {
    if (!file) return;
    createQuestions(file);
  };

  useEffect(() => {
    if (isSuccess) redirect("/pages/edit_questions");
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="mt-8 text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">QuizGPT</h1>
        <p className="text-lg text-gray-600">
          Upload a PDF and automatically generate 10 questions and answers to
          create your personalized quiz.
        </p>
      </div>
      <Cards />
      <div className="mx-auto max-w-5xl pt-16">
        <div className="bg-white rounded-lg shadow-xl border-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Document Upload
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Select a PDF file to generate quiz questions
            </p>
          </div>

          <div className="p-6 space-y-6">
            {!file ? (
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
                  ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50 scale-105"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Drag and drop your PDF here
                </h3>
                <p className="text-gray-600 mb-4">or click to select a file</p>

                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                  Select File
                </button>

                <input
                  id="file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-4">
                  Only PDF files are accepted
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleProcessPDF}
                  disabled={isPending}
                  className={`
                    w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md transition-all duration-200
                    ${
                      isPending
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }
                  `}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing PDF...
                    </>
                  ) : (
                    "Generate Questions"
                  )}
                </button>
              </div>
            )}

            {isPending && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span className="font-medium">Analyzing document...</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  We are extracting content from the PDF and generating
                  questions. This may take a few minutes.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            After uploading, you will be able to edit the generated questions
            before starting the quiz
          </p>
        </div>
      </div>
    </div>
  );
}
