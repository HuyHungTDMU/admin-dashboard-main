import { IPageMeta } from '../page-meta';

export interface IPaginationResponse<T> {
  data: T[];
  meta: IPageMeta;
}

export interface IPagingInfinityResponse {
  before?: string;
  after?: string;
}
