import axios from "axios";
import { Posts, Comments, User } from "@/types/app";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getUsers = () =>
  api.get<User[]>("/users").then(({ data }) => data);

export const getPosts = () => api.get<Posts>("/posts").then(({ data }) => data);

export const getComments = (postId: number) =>
  api.get<Comments>(`/posts/${postId}/comments`).then(({ data }) => data);
