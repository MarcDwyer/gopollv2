import { FErrorMessage } from "../types/poll_types";
import { Action } from "./reducers";

export type ErrorState = FErrorMessage | null;

export const SET_ERROR = Symbol();

const ErrorReducer = (state: ErrorState = null, { type, payload }: Action) => {
  switch (type) {
    case SET_ERROR:
      return payload;
    default:
      return state;
  }
};

export default ErrorReducer;
