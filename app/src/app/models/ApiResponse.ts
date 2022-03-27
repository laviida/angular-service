export interface ApiResponse {
  data: any;
  status: number,
  message?: string;
  error: boolean;
  stack?: string;
}
