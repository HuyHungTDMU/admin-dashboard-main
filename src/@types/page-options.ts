export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface IPageOptions {
  sortDirection: SortDirection;
  sort: string;
  page: number;
  take: number;
}
