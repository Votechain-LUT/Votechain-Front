import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../types/login.types";
import { AppThunk } from "./store";
import Http from "../services/http.service";
import { toast } from "react-toastify";

interface UserState {
  token: string | null;
  error: string | null;
}

interface TokenLoaded {
  token: string;
}

const initialState: UserState = {
  token: null,
  error: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTokenSuccess(state, action: PayloadAction<TokenLoaded>) {
      const { token } = action.payload;
      state.error = null;
      state.token = token;
    },
    getTokenFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.error = null;
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
    const token = await http.signIn(requestBody);
    dispatch(getTokenSuccess({ token: token.data.access }));
    toast.success("Logowanie przebiegło pomyślnie");
  } catch (err) {
    toast.error("Coś poszło nie tak :( " + err);
    dispatch(getTokenFailure(err));
  }
};
