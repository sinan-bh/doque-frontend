import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import workspaceReducer from "@/lib/store/features/workspace-slice";
import messageReducer from "@/lib/store/features/message-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      workspace: workspaceReducer,
      message: messageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
