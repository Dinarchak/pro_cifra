import styles from "./.module.css";

type FormTextareaType = {
    label?: string,
    placeholder?: string
    value: string
    callback: (value: string) => void
}

export default function FormTextarea(props: FormTextareaType) {

    const listener = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.callback(e.target.value);
    }

    return <div className={styles.textareaGroup}>
                {props.label && 
                    <label className={styles.label}>
                        {props.label}
                    </label>
                }
                <textarea
                    rows={4}
                    className={styles.textarea}
                    onChange={listener}
                    value={props.value}
                    placeholder={props.placeholder ? props.placeholder : ""}
                />
            </div>
}