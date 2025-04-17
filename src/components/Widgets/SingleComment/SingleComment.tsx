import { UserWithAvatar } from "../../../models/user";
import Comment from "../../../models/comment";
import { useComment } from "../../../provider/commentProvider";
import Avatar from "../Avatar/avatar";
import default_avatar from "../../../static/user-svgrepo-com.svg";
import styles from "./.module.css";
import { useEffect, useState } from "react";
import Button from "../../UI/Button/Button";
import commentService from "../../../services/commentService";
import { useAuth } from "../../../provider/authProvider";

export default function SingleComment({id}: {id: number}) {

    const context = useComment();
    const token = useAuth();
    const [ans, setAns] = useState("");
    const [comment, setComment] = useState<Comment>();
    const [user, setUser] = useState<UserWithAvatar>();
    const [showForm, setShowForm] = useState(false);
  

    useEffect(() => {
      const comment_ = context.commentsById[id]
      setComment(comment_);

      if (comment_) {
        setUser(context.usersById[comment_.iduser]);
      }}, [id, context.commentsById, context.usersById]);

    return (
    <div className={comment?.idanswerto === null ? styles.comment : styles.commentWithMargin}>
      <div className={styles.commentHeader}>
        <Avatar size={3} blob={user?.avatar} enabled={false} default_avatar={default_avatar}/>
        <div className={styles.commentUserInfo}>
          <span className={styles.commentUsername}>{user?.fullname}</span>
        </div>
      </div>
      <div className={styles.commentBody}>
        <p>{comment?.comment}</p>
        <span className={styles.reply} onClick={() => {setShowForm(true)}}>
          Ответить
        </span>
      </div>
      { (token.token && token.user && comment && showForm) &&
  (() => {
    const user = token.user; // 💡 TypeScript теперь уверен, что он не null

    return (
      <div className={styles.commentReplyForm}>
        <textarea
          rows={4}
          className={styles.textarea}
          onChange={(e) => {
            setAns(e.target.value);
          }}
          value={ans}
          placeholder="Начните писать"
        />
        <div className={styles.replyMenu}>
          <Button callback={async () => {
            await commentService.sendComment({
              comment: ans,
              idcourse: context.courseId,
              iduser: user.id, // теперь без ошибок
              idanswerto: comment.id
            });
            const resp = await commentService.getAllComments(context.courseId);
            context.updateCommentsList(resp);
            setShowForm(false);
            setAns("");
          }}>Отправить</Button>
          <Button callback={() => setShowForm(false)}>Закрыть</Button>
        </div>
      </div>
    );
  })()
}
    </div>
  );
}