import axios from "axios";
import { Posts, Post, Comments } from "@/types/app";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// export const fetchUsers = () => api.get("/users").then(({ data }) => data);

export const getPosts = () => api.get<Posts>("/posts").then(({ data }) => data);

export const getComments = (postId: Pick<Post, "id">) =>
  api.get<Comments>(`/posts/${postId}/comments`).then(({ data }) => data);
