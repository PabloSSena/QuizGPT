"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useQuestionsStore } from "../stores/questions.store";

export default function useCreateQuestions() {
  const { setQuestions } = useQuestionsStore();
  const mutate = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/create_questions", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        toast.error("Failed to upload file");
        throw new Error("Failed to upload file");
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success("Questions created successfully");
      setQuestions(data.questions);
    },

    onError: (error) => {
      toast.error("Error creating questions: " + error.message);
    },
  });

  return mutate;
}
