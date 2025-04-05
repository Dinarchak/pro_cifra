import React, { useState } from "react";
import authService from "../../../services/authServise";
import styles from './.module.css'

const RegisterPage: React.FC = () => {

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(props: React.FormEvent) {
        setError("");
        // console.log(password, confirmPassword);
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            console.error("Пароли не совпадают");
            return;
        }

        try {
            const resp = await authService.register({email: email, password: password, fullname: fullname, name: login});
            console.log("Запрос обработан")
        }
        catch {
            setError("Ошибка. Запрос не принят.")
            console.log(error)
        }
    }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Регистрация</h2>
        <form>
        <div className={styles.inputGroup}>
            <label>ФИО</label>
            <input
            type="text"
            required
            onChange={(e) => setFullName(e.target.value)}/>
          </div>
          <div className={styles.inputGroup}>
            <label>Почта</label>
            <input 
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className={styles.inputGroup}>
            <label>Логин</label>
            <input 
            type="name"
            required
            onChange={(e) => setLogin(e.target.value)}/>
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
            <div className={styles.inputGroup}>
              <label>Подтверждение пароля</label>
              <input
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>

          <button type="button" className={styles.button} onClick={submit}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;