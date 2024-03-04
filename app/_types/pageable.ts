export declare interface PageResponse<T> {
  content: T[];
  last: boolean;
  size: number;
  totalPages: number;
}

export declare interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
  desc?: string;
}
