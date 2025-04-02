import { InfoLabel, InfoValue } from "../../UI/Info/InfoLabel";
import style from "./.module.css"

type FieldsNames = {
    [key: string]: string;
};

type FieldValues = {
    [key: string]: any
}

export default function ObjectFields(data: FieldValues, dataNames: FieldsNames) {
    return (
        <div className={style.card}>
            {Object.keys(dataNames).map((key) => (
                <div key={key} className={style.field}>
                    <InfoLabel>{dataNames[key]}:</InfoLabel>
                    <InfoValue>{data[key]}</InfoValue>
                </div>
            ))}
        </div>
    );
}