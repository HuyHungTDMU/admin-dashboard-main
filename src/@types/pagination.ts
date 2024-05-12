export interface Pagination {
  total: number;
  limit: number;
  pageCount: number;
  currentPage: number;
  slNo: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prev: null | string;
  next: null | string;
}
