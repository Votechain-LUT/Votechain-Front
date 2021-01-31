import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest } from "../types";
import { AppThunk } from "./store";
import Http from "../services/http.service";
import { toast } from "react-toastify";

interface UserState {
  accessToken: string | null;
  jwtExpiryDate: string | null;
  isAdmin: string | null;
  error: string | null;
}

interface TokenLoaded {
  accessToken: string;
  jwtExpiryDate: string;
  isAdmin: string | null;
}

const initialState: UserState = {
  accessToken: null,
  error: null,
  jwtExpiryDate: null,
  isAdmin: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    getTokenSuccess(state, action: PayloadAction<TokenLoaded>) {
      const { accessToken, jwtExpiryDate, isAdmin } = action.payload;
      state.error = null;
      state.accessToken = accessToken;
      state.jwtExpiryDate = jwtExpiryDate;
      state.isAdmin = isAdmin;
    },
    getTokenFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    logout(state) {
      state.jwtExpiryDate = null;
      state.accessToken = null;
      state.error = null;
      state.isAdmin = null;
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
        isAdmin: response.data.isAdmin,
      })
    );
    toast.success("Logowanie przebiegło pomyślnie");
  } catch (err) {
    if (!err.response) {
      toast.error("Upewnij się że jesteś połączony z siecią");
    }
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
        isAdmin: response.data.isAdmin,
      })
    );
  } catch (err) {
    dispatch(getTokenFailure(err));
  }
};
