import { combineReducers } from "redux";
import appReducer from "./app/app.reducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;
