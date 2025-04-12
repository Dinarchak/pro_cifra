import styles from "./.module.css"

type FormInputType = {
  label: string,
  type: string,
  value?: string,
  placeholder?: string,
  callback: (value: string) => void;
};

export default function FormInput({label, callback, type, value, placeholder}: FormInputType) {

    const listener = (e: React.ChangeEvent<HTMLInputElement>) => {
      callback(e.target.value);
    }

    return <div className={styles.inputGroup}>
              <label>{label}</label>
              <input
                value={value}
                placeholder={placeholder}
                type={type}
                required
                onChange={listener}/>
            </div>
}