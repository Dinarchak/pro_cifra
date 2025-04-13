import { Form } from "react-router-dom";
import FormInput from "../../UI/FormInput/Input";
import styles from "./.module.css";

type CourseCardListFilterType = {
    onNameChange?: (value: string) => void,
    name?: string,

    onMinScoreChange?: (value: string) => void,
    minscore?: string, 

    onCodeChange?: (value: string) => void,
    code?: string

    onUniChange?: (value: string) => void
    uni?: string
}

export default function CourseCardListFilter(props: CourseCardListFilterType) {
    return <div>
        {props.onUniChange && props.uni !== undefined ?
            <FormInput
            value={props.uni}
            type="text"
            label="Университет"
            callback={props.onUniChange}/> : <></>}
        {props.onNameChange && props.name !== undefined ?
            <FormInput
            value={props.name}
            type="text"
            label="Направление"
            callback={props.onNameChange}/> : <></>}
        {props.onMinScoreChange && props.minscore !== undefined ? 
            <FormInput
            value={props.minscore}
            type="number"
            label="Cредний балл"
            callback={props.onMinScoreChange}/> : <></>}
        {props.onCodeChange && props.code !== undefined ?
            <FormInput
            value={props.code}
            type="text"
            label="Код направления"
            callback={props.onCodeChange}/> : <></>}
    </div>
}