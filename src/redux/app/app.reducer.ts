import { AppActions } from "./app.actions";
import { AppActionTypes } from "./app.actionTypes";

type AppState = {
  showSidebar: boolean;
};

const initialState: AppState = {
  showSidebar: false,
};

const appReducer = (state: AppState = initialState, action: AppActions) => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_SIDEBAR:
      return { showSidebar: !state.showSidebar };
    default:
      return state;
  }
};

export default appReducer;
