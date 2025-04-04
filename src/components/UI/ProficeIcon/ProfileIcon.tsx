import style from "./.module.css"
import icon from "../../../static/user-svgrepo-com.svg"

export default function ProfileIcon() {
    return (
        <div className={style.container}>
            <img className={style.icon} src={icon}/>
        </div>
        );
}