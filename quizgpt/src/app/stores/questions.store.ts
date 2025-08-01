"use client";
import { create } from "zustand";

const QUESTIONS_LOCAL_STORAGE_KEY = "questions";

interface IQuestionsStore {
  questions: IQuestion[];
  setQuestions: (value: IQuestion[]) => void;
}

const loadQuestionsFromLocalStorage = (): IQuestion[] | null => {
  if (typeof window !== "undefined") {
    const questionsStringfied = localStorage.getItem(
      QUESTIONS_LOCAL_STORAGE_KEY
    );
    if (questionsStringfied) {
      return JSON.parse(questionsStringfied) as IQuestion[];
    }
  }
  return null;
};

export const useQuestionsStore = create<IQuestionsStore>((set) => ({
  questions: loadQuestionsFromLocalStorage() || [],
  setQuestions: (value) => {
    localStorage.setItem(QUESTIONS_LOCAL_STORAGE_KEY, JSON.stringify(value));
    set({ questions: value });
  },
}));
