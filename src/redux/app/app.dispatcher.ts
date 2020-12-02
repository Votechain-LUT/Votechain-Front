import { Dispatch } from "react";
import { AppActionTypes } from "./app.actionTypes";
import { AppActions } from "./app.actions";

export class AppDispatcher {
  private readonly dispatch: Dispatch<AppActions>;

  constructor(dispatch: Dispatch<AppActions>) {
    this.dispatch = dispatch;
  }
  toggleSidebar = () => this.dispatch({ type: AppActionTypes.TOGGLE_SIDEBAR });
}
