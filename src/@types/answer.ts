export type IAnswer = {
  id: string;
  content: string;
  type: string;
  updatedAt: string;
  createdAt: string;
  isCorrect: boolean;
  correctAnswerOrder: number;
  questionId: string;
  courseId: string;
};
