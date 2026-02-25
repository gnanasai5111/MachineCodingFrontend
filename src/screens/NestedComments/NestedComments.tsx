import { useState } from "react";
import "./styles.less";
import type { CommentInterface } from "./comments-interface";
import Comments from "../../components/Comments";

function NestedComments() {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<CommentInterface[]>([]);

  const addHandler = () => {
    if (!input.trim()) {
      return;
    }
    const item: CommentInterface = {
      id: Date.now(),
      text: input,
      replies: [],
    };
    setComments([...comments, item]);
    setInput("");
  };

  const addReply = (parentId: number, text: string) => {
    const addApplyRecursively = (
      commentList: CommentInterface[]
    ): CommentInterface[] => {
      return commentList.map((comment) => {
        if (comment.id === parentId) {
          const newItem = { id: Date.now(), text: text, replies: [] };
          return {
            ...comment,
            replies: [...comment.replies, newItem],
          };
        }
        return {
          ...comment,
          replies: addApplyRecursively(comment.replies),
        };
      });
    };
    const updatedList = addApplyRecursively(comments);
    setComments([...updatedList]);
  };

  const deleteComment = (id: number) => {
    const deleteRecursively = (
      commentList: CommentInterface[]
    ): CommentInterface[] => {
      return commentList
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          replies: deleteRecursively(comment.replies),
        }));
    };

    const updatedList = deleteRecursively(comments);
    setComments([...updatedList]);
  };

  const editComment = (id: number, newText: string) => {
    const editRecursively = (
      commentList: CommentInterface[]
    ): CommentInterface[] => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, text: newText };
        }

        return {
          ...comment,
          replies: editRecursively(comment.replies),
        };
      });
    };

    setComments(editRecursively(comments));
  };

  return (
    <div className="container">
      <h1 className="main-heading">NestedComments</h1>
      <div className="comments-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={input}
            placeholder="Add a Comment"
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="btn-container">
            <button onClick={addHandler}> Add a comment</button>
          </div>
        </div>

        <div className="comments-container">
          {comments.map((comment) => {
            return (
              <Comments
                key={comment.id}
                comment={comment}
                addReply={addReply}
                deleteComment={deleteComment}
                editComment={editComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NestedComments;
