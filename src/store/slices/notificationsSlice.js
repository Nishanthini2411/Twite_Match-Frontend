import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [], // {id, type, title, message, actionUrl, isRead}
  },
  reducers: {
    addNotification: (state, action) => {
      // newest on top
      state.items.unshift(action.payload);
    },
    markOneRead: (state, action) => {
      const n = state.items.find((i) => i.id === action.payload);
      if (n) n.isRead = true;
    },
    markAllRead: (state) => {
      state.items = state.items.map((i) => ({ ...i, isRead: true }));
    },
    removeOne: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearAll: (state) => {
      state.items = [];
    },
  },
});

export const {
  addNotification,
  markOneRead,
  markAllRead,
  removeOne,
  clearAll,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
