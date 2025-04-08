import styles from "./.module.css";

type FormTextareaType = {
    label: string,
    callback: (value: string) => void
}

export default function FormTextarea({label, callback}: FormTextareaType) {

    const listener = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        callback(e.target.value);
    }

    return <div className={styles.textareaGroup}>
                <label className={styles.label}>
                    {label}
                </label>
                <textarea
                    rows={4}
                    className={styles.textarea}
                    onChange={listener}
                />
            </div>
}