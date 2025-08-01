import { create } from "zustand";

interface IQuizResultStore extends IQuizResult {
  setScore: (value: number) => void;
  setTotalQuestions: (value: number) => void;
  setPercentage: (value: number) => void;
  setTimeElapsed: (value: number) => void;
  setAnswers: (value: IQuizAnswer[]) => void;
}

export const useQuizResultStore = create<IQuizResultStore>((set) => ({
  answers: [],
  percentage: 0,
  score: 0,
  timeElapsed: 0,
  totalQuestions: 0,
  setTotalQuestions: (value) => set({ totalQuestions: value }),
  setTimeElapsed: (value) => set({ timeElapsed: value }),
  setScore: (value) => set({ score: value }),
  setPercentage: (value) => set({ percentage: value }),
  setAnswers: (value) => set({ answers: value }),
}));
