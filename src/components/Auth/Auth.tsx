import styles from "./.module.css"
import authService from "../../services/authServise"
import {useState} from "react"

type AuthType = {
    type: "login" | "register"
}

export default function Auth({type}: AuthType) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    async function submit(props: React.FormEvent) {
        setError("");
        if (type === 'register' && password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const resp = (type == "login" ? authService.login({email, password}) : authService.register({email, password}));
            console.log("Запрос обработан", resp)
        }
        catch {
            setError("Ошибка. Запрос не принят.")
        }
    }

    return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{type === "login" ? "Вход" : "Регистрация"}</h2>
        <form onSubmit={submit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          {type === "register" && (
            <div className={styles.inputGroup}>
              <label>Подтверждение пароля</label>
              <input
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
          )}
          <button type="submit" className={styles.button}>
            {type === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
};

