import { Pagination } from '../pagination';

export interface Response<T> {
  data?: T | null;
  message: string;
  status: number;
}

export type List<L> = {
  list: L[];
  paginator: Pagination;
};

export type Result = {
  data?: any;
  message: string;
  status: number;
};
