import { useState } from "react";
import type { CommentInterface } from "../screens/NestedComments/comments-interface";
import { LuMessageCircle } from "react-icons/lu";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";

function Comments({
  comment,
  addReply,
  deleteComment,
  editComment,
}: {
  comment: CommentInterface;
  addReply: (parentId: number, text: string) => void;
  deleteComment: (id: number) => void;
  editComment: (id: number, text: string) => void;
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editable, setEditable] = useState(false);

  const handleReplyToggle = () => {
    setShowReplyBox(!showReplyBox);
    if (editable) {
      setEditable(false);
      setReplyText("");
    }
  };

  const handleEditToggle = () => {
    setReplyText(comment.text);
    setEditable(true);
    setShowReplyBox(true);
  };

  const handleSubmit = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;

    if (editable) {
      editComment(comment.id, trimmed);
      setEditable(false);
    } else {
      addReply(comment.id, trimmed);
    }

    setReplyText("");
    setShowReplyBox(false);
  };

  const handleCancel = () => {
    setReplyText("");
    setEditable(false);
    setShowReplyBox(false);
  };

  return (
    <div className="item">
      <p>{comment.text}</p>
      <div className="icons-container">
        <div
          className="reply-box"
          onClick={handleReplyToggle}
          aria-label="Reply"
        >
          <LuMessageCircle size={14} />
          <p>{comment.replies.length}</p>
        </div>
        <MdDeleteOutline
          size={16}
          className="delete-icon"
          onClick={() => deleteComment(comment.id)}
        />
        <MdModeEdit
          size={16}
          className="edit-icon"
          onClick={handleEditToggle}
        />
      </div>

      {showReplyBox && (
        <div className="reply-input">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={editable ? "Edit comment..." : "Write a reply..."}
            rows={3}
          />
          <div className="button-container">
            <button onClick={handleCancel} className="cancel">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="submit"
              disabled={!replyText.trim()}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="nested-replies">
        {comment.replies?.map((reply) => (
          <Comments
            key={reply.id}
            comment={reply}
            addReply={addReply}
            deleteComment={deleteComment}
            editComment={editComment}
          />
        ))}
      </div>
    </div>
  );
}

export default Comments;
