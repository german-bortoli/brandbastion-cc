import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPosts } from "@/services/apiService";
import { RootState } from "@/store";
import { Posts } from "@/types/app";
/**
 * Ideally this file should be into a folder structure like:
 *  - features/post/postReducer.ts
 *  - features/post/postActions.ts
 *
 * But for this basic example I simplified a bit the structure
 */

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  return getPosts();
});

interface PostSliceState {
  posts: Posts;
  isLoading: boolean;
  hasError: boolean;
}

const initialState = {
  posts: [],
  isLoading: false,
  hasError: false,
} satisfies PostSliceState as PostSliceState;

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts = [];
      state.isLoading = false;
      state.hasError = true;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Posts>) => {
        state.posts = action.payload;
        state.isLoading = false;
        state.hasError = false;
      }
    );
  },
});

export const selectPosts = (state: RootState) => state.post.posts;
export const selectPostsIsLoading = (state: RootState) => state.post.isLoading;
export const selectPostsHasError = (state: RootState) => state.post.hasError;

export default postSlice.reducer;
