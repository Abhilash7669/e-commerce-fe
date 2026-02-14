export type PaginatedResultDto<T> = {
  pagingInfo: {
    itemsPerPage: number;
    currentPage: number;
    itemsInPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
  };
  items: Array<T>;
};
