export type APIResponse = {
  status: string;
  error?: string;
  detail?: string;
};

export type IAction<T> = { type: T | null; payload?: any };

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type IEntityMap<T> = { [key: string]: T };

export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export interface IToast {
  message: string;
  type: ToastType;
  id?: number;
}


export enum StatusType {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
  noaction = "noaction",
}

export type PaginatedResponse<T> = {
  total: number;
  items: T[];
  statusCode: number;
};
