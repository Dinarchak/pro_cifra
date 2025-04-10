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
    for (let i = 0; i < Math.min(3, uni.giveCourseDTOList.length); ++i) {
        courses_str += `${uni.giveCourseDTOList[i].major}, `;
    }

    if (uni.giveCourseDTOList.length > 3) {
        courses_str += `и еще ${uni.giveCourseDTOList.length - 3} ${get_correct_form(uni.giveCourseDTOList.length - 3)} программы обмена`;
    }


    return <>
        <div className={style.card}>
            <Avatar image_path="https://avatars.mds.yandex.net/i?id=45379510be7254a216b9b148c628954943ca18e0-2455126-images-thumbs&n=13" size={4}/>
            <div className={style.desc}>
                <h3 className={style.name}>{uni.university}</h3>
                <p className={style.courses}>{courses_str}</p>
            </div>
            <div className={style.photo}>

            </div>
        </div>
    </>;
}

function min(arg0: number) {
    throw new Error("Function not implemented.");
}
