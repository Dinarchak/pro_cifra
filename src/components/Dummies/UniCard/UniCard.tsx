import { Link } from "react-router-dom";
import University from "../../../models/university";
import Avatar from "../../UI/Avatar/avatar";
import uniService from "../../../services/uniService";
import { useEffect, useState } from "react";
import style from "./.module.css";
import usePooling from "../../../hooks/usePooling";

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

export default function UniCard({obj}: UniCardType) {
    const [avatar, setAvatarBlob] = useState();
    const [background, setBackgroundUrl] = useState("");

    usePooling(60000, async () => {
        const avatar_ = await uniService.getUniversityAvatar(obj.id);
        const background_blob = await uniService.getUniversityBackground(obj.id);
        if (background_blob !== undefined) {
            setBackgroundUrl(URL.createObjectURL(background_blob))
        } else {
            setBackgroundUrl("");
        }

        setAvatarBlob(avatar_);
    })

    let courses_str = "";
    for (let i = 0; i < Math.min(3, obj.giveCourseDTOList.length); ++i) {
        courses_str += `${obj.giveCourseDTOList[i].major}, `;
    }

    courses_str = courses_str.slice(0, courses_str.length - 2);

    if (obj.giveCourseDTOList.length > 3) {
        courses_str += `и еще ${obj.giveCourseDTOList.length - 3} ${get_correct_form(obj.giveCourseDTOList.length - 3)} программы обмена`;
    }


    return <>
        <div className={style.card}>
            <div className={style.uniAvatar}>
                <Avatar blob={avatar} size={4}/>
            </div>
            <div className={style.desc}>
                <Link to={`/university/${obj.id}`}><h3 className={style.name}>{obj.university}</h3></Link>
                <p className={style.courses}>{courses_str}</p>
            </div>
            <div className={style.photo}>
                <img src={background}/>
            </div>
        </div>
    </>;
}