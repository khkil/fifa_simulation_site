export declare type Status = "success" | "fail";
export declare interface Response {
  status: Status;
  data: object | Array<object>;
  message: string;
}

export declare type Theme = "info" | "error" | "success" | "warning" | "normal";

export declare interface Pageable {
  sort?: string;
  desc?: string;
}
