import React, { useState } from "react";
import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router";
import styles from "./.module.css"
import authService from "../../../services/authServise";


const LoginPage: React.FC = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: any) {
    try {
        const resp = await authService.login({password: password, name: login});
        console.log("Запрос обработан", resp)
        token.setToken(resp);
        navigate('/profile', { replace: true});
    }
    catch {
        console.error("Ошибка. Запрос не принят.")
    }
}

  return (<div className={styles.container}>
    <div className={styles.card}>
      <h2>Вход</h2>
      <form>
      <div className={styles.inputGroup}>
          <label>Логин</label>
          <input
          type="text"
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
        <button type="button" className={styles.button} onClick={submit}>
          Войти
        </button>
      </form>
    </div>
  </div>
);
};

export default LoginPage;