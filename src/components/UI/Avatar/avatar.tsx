import style from "./.module.css";

type AvatarType = {
    image_path: string;
}

export default function Avatar({image_path}:AvatarType) {
    return (
    <div className={style.container}>
        <img className={style.avatar} src={image_path}/>
    </div>
    );
}