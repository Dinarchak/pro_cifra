import { Link } from "react-router-dom";
import University from "../../../models/university";
import Avatar from "../../Widgets/Avatar/avatar";
import uniService from "../../../services/uniService";
import { useCallback, useEffect, useState } from "react";
import style from "./.module.css";
import usePooling from "../../../hooks/usePooling";
import default_avatar from "../../../static/uni.svg";

function get_correct_form(number: number): string {
    if ((5 <= number % 100 && number % 100 <= 19) || (number % 10 === 0)) {
        return "курсов";
    }
    if (number % 10 === 1)
        return "курс";

    return "курса";
}

type UniCardType = {
    obj: University
};

export default function UniCard(params: UniCardType) {
    const [avatar, setAvatarBlob] = useState();
    const [background, setBackgroundUrl] = useState("");
    const [enabled, setEnabled] = useState(false);

    const fetchData = useCallback(async () => {
        const avatar_ = await uniService.getUniversityAvatar(params.obj.id);
        const background_blob = await uniService.getUniversityBackground(params.obj.id);
        if (background_blob !== undefined) {
            setBackgroundUrl(URL.createObjectURL(background_blob))
        } else {
            setBackgroundUrl("");
        }

        setAvatarBlob(avatar_);
    }, [params.obj]);

    useEffect(() => {
        setEnabled(true)
    return () => setEnabled(false)}, []);

    usePooling(1000, fetchData);

    let courses_str = "";
    for (let i = 0; i < Math.min(3, params.obj.giveCourseDTOList.length); ++i) {
        courses_str += `${params.obj.giveCourseDTOList[i].major}, `;
    }

    courses_str = courses_str.slice(0, courses_str.length - 2);

    if (params.obj.giveCourseDTOList.length > 3) {
        courses_str += `и еще ${params.obj.giveCourseDTOList.length - 3} ${get_correct_form(params.obj.giveCourseDTOList.length - 3)} программы обмена`;
    }


    return <>
        <div className={style.card}>
            <div className={style.uniAvatar}>
                <Avatar blob={avatar} size={4} enabled={false} default_avatar={default_avatar}/>
            </div>
            <div className={style.desc}>
                <Link to={`/university/${params.obj.id}`}><p className={style.name}>{params.obj.university}</p></Link>
                <p className={style.courses}>{courses_str}</p>
            </div>
            <div className={style.photo}>
                <img src={background}/>
            </div>
        </div>
    </>;
}