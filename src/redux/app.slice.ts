import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmModalState {
  isVisible: boolean;
  headerText: string;
  message: string;
}

interface AppState {
  showSidebar: boolean;
  modalState: ConfirmModalState;
}

interface SetModal {
  headerText: string;
  message: string;
}

const initialState: AppState = {
  showSidebar: false,
  modalState: {
    isVisible: false,
    headerText: "",
    message: "",
  },
};

const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    toggleConfirmModal(state) {
      const nextState = !state.modalState.isVisible;
      const overlay = document.getElementById("overlay");
      if (overlay) {
        nextState
          ? (overlay.style.display = "block")
          : (overlay.style.display = "none");
      }
      state.modalState.isVisible = nextState;
    },
    setModal(state, action: PayloadAction<SetModal>) {
      const { headerText, message } = action.payload;
      state.modalState.headerText = headerText;
      state.modalState.message = message;
    },
  },
});

export const { toggleSidebar, toggleConfirmModal, setModal } = app.actions;
export default app.reducer;
