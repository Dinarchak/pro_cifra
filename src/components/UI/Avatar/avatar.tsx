import style from "./.module.css";

type AvatarType = {
    image_path: string,
    size: number
}

export default function Avatar({image_path, size=4}:AvatarType) {
    const logo_size = size.toString() + "rem";

    return (
    <div className={style.container} style={{height: logo_size, width: logo_size}}>
        <img className={style.avatar} src={image_path}/>
    </div>
    );
}