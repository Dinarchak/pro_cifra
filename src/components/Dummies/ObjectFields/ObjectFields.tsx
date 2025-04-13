import { InfoLabel, InfoValue } from "../../UI/Info/InfoLabel";
import style from "./.module.css"

type FieldNames = {
    [key: string]: string;
};

type FieldValues = {
    [key: string]: string | number | null | undefined;
}

type ObjectFieldsType = {
    dataValues: FieldValues,
    dataNames: FieldNames
}

export default function ObjectFields({dataValues, dataNames}: ObjectFieldsType) {
    return (
        <div className={style.card}>
            {Object.keys(dataNames).map((key) => {
                if (dataValues[key] !== null && dataValues[key] !== undefined) {
                   return <div key={key} className={style.field}>
                        <InfoLabel>{dataNames[key]}:</InfoLabel>
                        <InfoValue>{dataValues[key]}</InfoValue>
                    </div>
                } 
            })}
        </div>
    );
}