import { ReactNode, MouseEventHandler  } from "react";
import style from "./.module.css";

type ButtonType = {
    children: ReactNode,
    callback: MouseEventHandler<HTMLButtonElement> | null,
}

export default function Button(props: ButtonType) {
    if (props.callback) 
        return (<>
            <button className={style.button} type="submit" onClick={props.callback}>{props.children}</button>
        </>)
    return (<>
        <button className={style.button} type="submit">{props.children}</button>
    </>)
};