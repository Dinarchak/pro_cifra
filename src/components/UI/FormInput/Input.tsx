import styles from "./.module.css"

type FormInputType = {
  label: string,
  type: string,
  value?: string,
  placeholder?: string,
  callback: (value: string) => void;
};

export default function FormInput(props: FormInputType) {

    const listener = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.callback(e.target.value);
    }

    return <div className={styles.inputGroup}>
              <label>{props.label}</label>
              <input
                value={props.value ? props.value : ""}
                placeholder={props.placeholder ? props.placeholder : ""}
                type={props.type}
                required
                onChange={listener}/>
            </div>
}