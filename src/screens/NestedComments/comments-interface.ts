export interface CommentInterface {
  id: number;
  text: string;
  replies: CommentInterface[];
}
