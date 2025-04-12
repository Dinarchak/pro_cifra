import style from "./.module.css";

type AvatarType = {
    blob: any | null,
    size: number
}

export default function Avatar({blob, size=4}:AvatarType) {
    const logo_size = size.toString() + "rem";

    console.log(blob);

    return (
    <div className={style.container} style={{height: logo_size, width: logo_size}}>
        {
            blob === undefined ? <></> : <img className={style.avatar} src={URL.createObjectURL(blob)}/>   
        }
    </div>
    );
}