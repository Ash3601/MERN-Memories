import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  AUTH,
} from "../constants/actionTypes";

export const signin = (formData, history) => {
  return async (dispatch) => {
    try {
      // log in the user
      const { data } = await api.signin(formData);
      dispatch({ type: AUTH, data });

      history("/");
    } catch (error) {
      console.log("Client Error: SignIn action method", error);
    }
  };
};

export const signup = (formData, history) => {
  return async (dispatch) => {
    try {
      // log in the user
      const { data } = await api.signup(formData);
      dispatch({ type: AUTH, data });

      history("/");
    } catch (error) {
      console.log("Client Error: SignUp action method", error);
    }
  };
};
