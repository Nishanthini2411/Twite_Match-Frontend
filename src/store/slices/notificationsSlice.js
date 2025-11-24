import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAllRead: (state) => {
      state.notifications.forEach(n => n.read = true);
    },
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    }
  }
});

export const { markAllRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
