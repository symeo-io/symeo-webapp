export type PageQuery<T> = {
  pageIndex: number;
  pageSize: number;
  sortBy: keyof T;
  sortDirection: "asc" | "desc";
};

export type PageResponse = {
  total_page_number: number;
  total_item_number: number;
};
