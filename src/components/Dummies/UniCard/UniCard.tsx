import { Link } from "react-router";
import University from "../../../models/university";
import Avatar from "../../UI/Avatar/avatar";
import style from "./.module.css";

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
                <Avatar image_path="https://avatars.mds.yandex.net/i?id=45379510be7254a216b9b148c628954943ca18e0-2455126-images-thumbs&n=13" size={4}/>
            </div>
            <div className={style.desc}>
                <Link to={`/university/${obj.id}`}><h3 className={style.name}>{obj.university}</h3></Link>
                <p className={style.courses}>{courses_str}</p>
            </div>
            <div className={style.photo}>
                <img src="https://avatars.mds.yandex.net/i?id=c14545ffcb5e55a037d9972947ec2f38a3fab30d-12482695-images-thumbs&n=13"/>
            </div>
        </div>
    </>;
}