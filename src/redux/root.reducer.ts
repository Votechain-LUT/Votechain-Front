import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./app.slice";
import userReducer from "./user.slice";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
