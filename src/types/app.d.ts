export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type Posts = Post[];
export type Tags = string[];

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  tags?: Tags;
}

export type Comments = Comment[];
