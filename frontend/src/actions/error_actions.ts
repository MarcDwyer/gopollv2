import { FErrorMessage } from "../types/poll_types";
import { SET_ERROR } from "../reducers/error_reducer";
import { Dispatch } from "redux";

export const setError = (err: FErrorMessage) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch({
      type: SET_ERROR,
      payload: null
    });
  }, 8000);

  dispatch({
    type: SET_ERROR,
    payload: err
  });
};
