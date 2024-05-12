import { IAnswer } from './answer';

export type IQuestion = {
  id: string;
  title: string;
  description: string;
  type: string;
  imageUrl: any;
  content: string;
  choiceAmount: number;
  updatedAt: string;
  createdAt: string;
  answers?: IAnswer[];
  courseId: string;
  rewardValue: number;
  rewardAsset: string;
};
