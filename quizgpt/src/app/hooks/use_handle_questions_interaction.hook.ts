import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuestionsStore } from "../stores/questions.store";

export const useHandleQuestionsInteraction = () => {
  const [questionsAux, setQuestionsAux] = useState<IQuestion[]>([]);
  const { setQuestions, questions } = useQuestionsStore();

  useEffect(() => {
    setQuestionsAux(questions);
  }, [questions]);

  const updateQuestion = (id: string, field: keyof IQuestion, value: any) => {
    setQuestionsAux((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestionsAux((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestionsAux((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestionsAux((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, idx) => idx !== optionIndex),
              correct_answer:
                q.correct_answer > optionIndex
                  ? q.correct_answer - 1
                  : q.correct_answer,
            }
          : q
      )
    );
  };

  const addQuestion = () => {
    const newQuestion: IQuestion = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correct_answer: 0,
      explanation: "",
    };
    setQuestionsAux((prev) => [...prev, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestionsAux((prev) => prev.filter((q) => q.id !== id));
  };

  const saveQuestions = async () => {
    setQuestions(questionsAux);
    toast.success("Questions saved successfully!");
  };

  const startQuiz = () => {
    redirect("/pages/quiz");
  };

  return {
    questionsAux,
    setQuestionsAux,
    updateQuestion,
    updateOption,
    addOption,
    removeOption,
    addQuestion,
    removeQuestion,
    saveQuestions,
    startQuiz,
  };
};
