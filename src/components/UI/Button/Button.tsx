import { ReactNode, MouseEventHandler  } from "react";
import style from "./.module.css";

type ButtonType = {
    children: ReactNode,
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button(props: ButtonType) {
    
    return (<>
        <button className={style.button} type="submit" onClick={props.callback}>{props.children}</button>
    </>)
};