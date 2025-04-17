import { UserWithAvatar } from "../models/user";
import Comment from "../models/comment";
import { createContext, useContext } from "react";

type CommentsContextType = {
    commentsById: Record<number, Comment>,
    usersById: Record<number, UserWithAvatar>,
    courseId: number,
    updateCommentsList: (value: Array<Array<Comment>>) => void
};

type CommentProviderType = {
    children: React.ReactNode,
    comments: Record<number, Comment>,
    courseId: number,
    users: Record<number, UserWithAvatar>,
    updateCommentsList: (value: Array<Array<Comment>>) => void
};

const CommentsContext = createContext<CommentsContextType>({
    commentsById: {},
    usersById: {},
    courseId: -1,
    updateCommentsList: (value: Array<Array<Comment>>) => {return}
});

export default function CommentProvider(props: CommentProviderType) {
    return <CommentsContext.Provider
            value={{
                commentsById: props.comments,
                usersById: props.users,
                courseId: props.courseId,
                updateCommentsList: props.updateCommentsList
                }}>
                        {props.children}
            </CommentsContext.Provider>;
}

const useComment = () => {
    return useContext(CommentsContext);
}

export { useComment };