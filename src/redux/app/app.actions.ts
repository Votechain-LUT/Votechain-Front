import { AppActionTypes } from "./app.actionTypes";

export interface ToggleSidebar {
  readonly type: AppActionTypes.TOGGLE_SIDEBAR;
}

export type AppActions = ToggleSidebar;
