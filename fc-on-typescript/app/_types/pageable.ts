export declare interface PageResponse {
  content: any[];
  last: boolean;
  size: number;
}

export declare interface PageRequest {
  page?: number;
  size?: number;
  sort?: string;
  desc?: string;
}
