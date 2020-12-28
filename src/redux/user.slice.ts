import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../types";
import { AppThunk } from "./store";
import Http from "../services/http.service";
import { toast } from "react-toastify";

interface UserState {
  accessToken: string | null;
  jwtExpiryDate: string | null;
  error: string | null;
}

interface TokenLoaded {
  accessToken: string;
  jwtExpiryDate: string;
}

const initialState: UserState = {
  accessToken: null,
  error: null,
  jwtExpiryDate: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTokenSuccess(state, action: PayloadAction<TokenLoaded>) {
      const { accessToken, jwtExpiryDate } = action.payload;
      state.error = null;
      state.accessToken = accessToken;
      state.jwtExpiryDate = jwtExpiryDate;
    },
    getTokenFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.jwtExpiryDate = null;
      state.accessToken = null;
      state.error = null;
      window.localStorage.setItem("logout", String(Date.now()));
    },
  },
});

export const { getTokenSuccess, getTokenFailure, logout } = user.actions;

export default user.reducer;

export const fetchToken = (requestBody: LoginRequest): AppThunk => async (
  dispatch
) => {
  const http = new Http();
  try {
    const response = await http.signIn(requestBody);
    dispatch(
      getTokenSuccess({
        accessToken: response.data.access,
        jwtExpiryDate: response.data.expires,
      })
    );
    toast.success("Logowanie przebiegło pomyślnie");
  } catch (err) {
    toast.error("Coś poszło nie tak :( " + err.response.data.detail);
    dispatch(getTokenFailure(err));
  }
};

export const refreshToken = (): AppThunk => async (dispatch) => {
  const http = new Http();
  try {
    const response = await http.refreshToken();
    dispatch(
      getTokenSuccess({
        accessToken: response.data.access,
        jwtExpiryDate: response.data.expires,
      })
    );
  } catch (err) {
    dispatch(getTokenFailure(err));
  }
};
