import style from "./.module.css"
import icon from "../../../static/person_light.svg"

export default function ProfileIcon() {
    return (
        <div className={style.container}>
            <img className={style.icon} src={icon}/>
        </div>
        );
}