import { configureStore } from "@reduxjs/toolkit";
import spaceSlice from "./features/space-slice";
import tasksSlice from "./features/tasks-slice";
import userSlice from "./features/userSlice";
import workspaceReducer from "@/lib/store/features/workspace-slice";
import messageReducer from "@/lib/store/features/message-slice";
import adminAuthReducer from "@/lib/store/features/admin/admin-auth-slice"
import adminmMembersReducer from '@/lib/store/features/admin/admin-member-slice'
import adminWorkspaceReducer from '@/lib/store/features/admin/admin-workspace-slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      space: spaceSlice,
      tasks: tasksSlice,
      user: userSlice,
      workspace: workspaceReducer,
      message: messageReducer,
      adminAuth: adminAuthReducer,
      adminMembers: adminmMembersReducer,
      adminWorkspace: adminWorkspaceReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
