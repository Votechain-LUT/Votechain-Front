import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  showSidebar: boolean;
}

interface SetModal {
  headerText: string;
  message: string;
}

const initialState: AppState = {
  showSidebar: false,
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { toggleSidebar } = app.actions;
export default app.reducer;
