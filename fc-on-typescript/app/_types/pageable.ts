/*export declare interface Pageable {
  content: Array<object | string | number>;
  last: boolean;
}*/

export declare interface Pageable {
  page?: number;
  size?: number;
  sort?: string;
  desc?: string;
}
