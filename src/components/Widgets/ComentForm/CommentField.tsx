import { useCallback, useState } from "react";
import FormInput from "../../UI/FormInput/Input";
import Button from "../../UI/Button/Button";
import userService from "../../../services/userService";
import usePooling from "../../../hooks/usePooling";
import commentService from "../../../services/commentService";
import FormTextarea from "../../UI/FormTextArea/FormTextArea";
import { useAuth } from "../../../provider/authProvider";
import { useComment } from "../../../provider/commentProvider";


type CommentFormType = {
    courseId: number
}


export default function CommentForm({courseId}: CommentFormType) {
    const [comment, setComment] = useState("");
    const [userId, setUserId] = useState(-1);
    const context = useComment();

    const token = useAuth();

    const fetchData = useCallback(async () => {
        const user = await userService.getUser();
        setUserId(user.id);
    }, [])

    usePooling(1000, fetchData);

    return !token.token ? <></> : <div>
                <FormTextarea value={comment} callback={setComment} placeholder="Начните писать..."/>
                <Button callback={ async () => {
                    try {
                        await commentService.sendComment({
                            comment: comment,
                            idcourse: courseId,
                            iduser: userId,
                            idanswerto: null});
                        const resp = await commentService.getAllComments(context.courseId);
                        context.updateCommentsList(resp);
                        setComment("");
                    }
                    catch(error) {
                        console.error('Ошибка загрузки', error)
                    }}}>Отправить</Button>
            </div>
}