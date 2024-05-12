// ----------------------------------------------------------------------

import { ILesson } from './lesson';
import { IQuestion } from './question';

export type ICourse = {
  id: string;
  title: string;
  author: {
    walletAddress: string;
    name: string;
    title: string;
  };
  reports: any[];
  isUnreadReport: boolean;
  activeStatus: string;
  contentLink: string;
  createdAt: string;
  description: string;
  type: string;
  difficult: string;
  imageUrl: any;
  authorTitle: string;
  authorName: string;
  lessons?: ILesson[];
  questions?: IQuestion[];
  totalReward: number;
  totalQuestion: number;
};

// ----------------------------------------------------------------------

export type ICourseState = {
  isLoading: boolean;
  error: Error | string | null;
  courses: ICourse[];
  course: ICourse | null;
};

// ----------------------------------------------------------------------
