import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  showSidebar: boolean;
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
