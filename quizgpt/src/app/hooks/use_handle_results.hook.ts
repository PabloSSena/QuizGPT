import { Award, Target, Trophy } from "lucide-react";

export const useHandleReslts = () => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}min ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-50 border-green-200";
    if (percentage >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90)
      return { message: "Excellent! Outstanding performance!", icon: Trophy };
    if (percentage >= 80)
      return { message: "Very good! You master the topic.", icon: Award };
    if (percentage >= 60)
      return { message: "Good job! Keep studying.", icon: Target };
    return { message: "Keep practicing to improve.", icon: Target };
  };

  return {
    formatTime,
    getScoreColor,
    getScoreBgColor,
    getPerformanceMessage,
  };
};
