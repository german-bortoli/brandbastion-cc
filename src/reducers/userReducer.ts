import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUsers } from "@/services/apiService";
import { RootState } from "@/store";
import { User, Users } from "@/types/app";
/**
 * Ideally this file should be into a folder structure like:
 *  - features/user/userReducer.ts
 *  - features/user/userActions.ts
 *
 * But for this basic example I simplified a bit the structure
 */

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const tmpUsers = await getUsers();

  // Convert to map
  return tmpUsers.reduce((users: Users, item: User) => {
    users[item.id] = item;
    return users;
  }, {});
});

interface UserSliceState {
  users: Users;
  isLoading: boolean;
  hasError: boolean;
}

const initialState = {
  users: {},
  isLoading: false,
  hasError: false,
} satisfies UserSliceState as UserSliceState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.rejected, (state) => {
      state.users = {};
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<Users>) => {
        state.users = action.payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
  },
});

export const selectUsers = (state: RootState) => state.user.users;
export const selectUsersIsLoading = (state: RootState) => state.user.isLoading;
export const selectUsersHasError = (state: RootState) => state.user.hasError;

export default userSlice.reducer;
