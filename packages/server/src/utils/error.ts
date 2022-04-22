/* eslint-disable functional/no-this-expression -- httpError for entire appliaction */
// Example
/* ts
 * import { HttpError, HttpStatusCode } from "@typeofweb/server";
 *
 * import { app } from "./app";
 *     throw new HttpError(
 *       HttpStatusCode.ImaTeapot,
 *       "Ohh yes, the coffe will be in few seconds"
 *     );
 *   },
 * });
 */

import { HttpStatusCode } from "./httpStatusCodes";

import type { Response, Request } from "express";
export interface StatusError {
  readonly statusCode: HttpStatusCode;
}
export class HttpError extends Error implements StatusError {
  /**
   * @param statusCode - HTTP Status code. If an invalid code is provided, 500 will be used instead. Use {@link HttpStatusCode} for readability.
   * @param message - Message to be included in the response. If not provided, name of HttpStatusCode is used by default.
   * @param body - Additional data to be included in the response. Useful for returning nested errors or details.
   */
  constructor(
    public readonly statusCode: HttpStatusCode,
    message?: string,
    public readonly body?:
      | Record<string, unknown>
      | readonly unknown[]
      | unknown
  ) {
    super(message);
    if (statusCode < 100 || statusCode >= 600) {
      this.statusCode = HttpStatusCode.InternalServerError;
    }
    this.name = "HttpError";
    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
export const errorMiddleware = (err: unknown, _: Request, res: Response) => {
  console.log("errorMiddleware");
  if (err instanceof HttpError) {
    return res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message, body: err.body });
  }
};
