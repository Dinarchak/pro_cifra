import styles from "./.module.css"

type FormInputType = {
  label: string,
  type: string
  callback: (value: string) => void;
};

export default function FormInput({label, callback, type}: FormInputType) {

    const listener = (e: React.ChangeEvent<HTMLInputElement>) => {
      callback(e.target.value);
    }

    return <div className={styles.inputGroup}>
              <label>{label}</label>
              <input
                type={type}
                required
                onChange={listener}/>
            </div>
}