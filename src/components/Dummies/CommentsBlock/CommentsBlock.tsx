import SingleComment from "../../Widgets/SingleComment/SingleComment";
import styles from "./.module.css";
import Comment from "../../../models/comment";
import { useEffect, useState } from "react";

export default function CommentsBlock({comments}: {comments: Comment[]}) {

    const [discussion_continuition, setDiscussionContinuition] = useState<Comment[]>(comments.slice(1));
    
    useEffect(() => {
        setDiscussionContinuition(comments.slice(1));
    }, [comments]);

    return <>
        <div className={styles.block}>
            <div className={styles.firstMessage}>
                <SingleComment id={comments[0].id}/>
            </div>
            <div className={styles.discussion}>
                {discussion_continuition.map((c: Comment) => {
                    return <div key={c.id}><SingleComment id={c.id}/></div>
                })}
            </div>
        </div>        
    </>;
}