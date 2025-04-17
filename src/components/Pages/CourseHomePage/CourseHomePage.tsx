import Course from "../../../models/course";
import ObjectFields from "../../Dummies/ObjectFields/ObjectFields";
import CourseFieldNames from "./constants";
import courseService from "../../../services/courseService";
import styles from "./.module.css";
import Comment from "../../../models/comment";

import { useParams } from "react-router";
import { useCallback, useState, createContext, useContext, ReactNode, useEffect } from "react";
import usePooling from "../../../hooks/usePooling";

import CommentForm from "../../Widgets/ComentForm/CommentField";
import commentService from "../../../services/commentService";
import { UserWithAvatar } from "../../../models/user";
import userService from "../../../services/userService";
import CommentProvider from "../../../provider/commentProvider";
import CommentsBlock from "../../Dummies/CommentsBlock/CommentsBlock";



export default function CourseHomePage() {

    const [comments, setComments] = useState<Array<Array<Comment>>>([]);
    const [commentsById, setCommentsById] = useState<Record<number, Comment>>({});
    const [usersById, setUsersById] = useState<Record<number, UserWithAvatar>>({});
    const [commentsCount, setCommentsCount] = useState(0);

    const id = Number(useParams().id);
    const [course, setCourse] = useState<Course>({
        id: -1,
        major: "",
        minscore: 0,
        description: "",
        university: "",
        requirement: "",
        coursecode: ""});

    const fetchData = useCallback(async() => {
        const course_= await courseService.getCourseById(id);
        setCourse(course_);

        const comments_ = await commentService.getAllComments(id);
        setComments(comments_);
    }, [id]);

    useEffect(() => {
        const loadData = async () => {
        const newCommentsById: Record<number, Comment> = {};
        const userIdSet = new Set<number>();

        comments.flat().forEach((i: Comment) => {
            newCommentsById[i.id] = { ...i};
            userIdSet.add(i.iduser);
        })
        setCommentsById(newCommentsById);

        const usersArray = await Promise.all(
            Array.from(userIdSet).map(async (u) => {
              const newUser: UserWithAvatar = await userService.getUserById(u);
              try {
                newUser.avatar = await userService.getUserAvatar(newUser.id);
              } catch {
                console.error("Ошибка загрузки аватарки");
              }
              return [u, newUser] as const;
            })
          );
          const newUsersById: Record<number, UserWithAvatar> = Object.fromEntries(usersArray);
          setUsersById(newUsersById);
        }
        loadData();
    }, [comments])

    usePooling(60000, fetchData);

    return <>
        <div>
            <h3>
                {course?.major + ' ' + commentsCount}
            </h3>
            <p>{course?.coursecode}</p>
        </div>
        <div>
            <ObjectFields dataNames={CourseFieldNames} dataValues={course}/>
            <p>{course.description}</p>
        </div>
        <div>
            <CommentProvider
            comments={commentsById}
            users={usersById}
            courseId={id}
            updateCommentsList={setComments}>
                <div>
                    <CommentForm courseId={id}/>
                </div>
                {comments.map((block) => {
                    return <div key={block[0].id}><CommentsBlock comments={block}/></div>
                })}
            </CommentProvider>
        </div>
    </>;
}