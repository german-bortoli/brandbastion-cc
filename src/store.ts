import { configureStore } from "@reduxjs/toolkit";

import PostReducer from "@/reducers/postReducer";
import userReducer from "@/reducers/userReducer";
import commentReducer from "./reducers/commentReducer";

export const store = configureStore({
  reducer: { post: PostReducer, user: userReducer, comment: commentReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState}
export type AppDispatch = typeof store.dispatch;
