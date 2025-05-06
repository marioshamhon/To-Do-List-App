export default class CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;

  constructor(message: string) {
    super(message);
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
