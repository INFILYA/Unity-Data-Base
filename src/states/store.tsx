import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    // listOfTeams: listOfTeamsReducer, //+
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
