import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getComments } from "@/services/apiService";
import { RootState } from "@/store";
import { Comments } from "@/types/app";
/**
 * Ideally this file should be into a folder structure like:
 *  - features/comment/commentReducer.ts
 *  - features/comment/commnetActions.ts
 *
 * But for this basic example I simplified a bit the structure
 */

export const fetchComments = createAsyncThunk(
  "comment/fetchPosts",
  async (postId: number) => {
    return getComments(postId);
  }
);

interface CommentSliceState {
  comments: Comments;
  isLoading: boolean;
  hasError: boolean;
}

const initialState = {
  comments: [],
  isLoading: false,
  hasError: false,
} satisfies CommentSliceState as CommentSliceState;

export const postSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments = [];
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      fetchComments.fulfilled,
      (state, action: PayloadAction<Comments>) => {
        state.comments = action.payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
  },
});

export const selectComments = (state: RootState) => state.comment.comments;
export const selectCommentsIsLoading = (state: RootState) =>
  state.comment.isLoading;
export const selectCommentsHasError = (state: RootState) =>
  state.comment.hasError;

export default postSlice.reducer;
