import React, { useState } from "react";
import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router";
import styles from "./.module.css"
import authService from "../../../services/authServise";
import FormInput from "../../UI/FormInput/Input";


const LoginPage: React.FC = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
        const resp = await authService.login({password: password, name: login});
        token.setToken(resp);
        navigate('/profile');
    }
    catch {
        console.error("Ошибка. Запрос не принят.")
    }
}

  return (<div className={styles.container}>
    <div className={styles.card}>
      <h2>Вход</h2>
      <form>
      <FormInput label="Логин" callback={setLogin} type="text" value={login}/>
      <FormInput label="Пароль" callback={setPassword} type="password" value={password}/>
        <button type="button" className={styles.button} onClick={submit}>
          Войти
        </button>
      </form>
    </div>
  </div>
);
};

export default LoginPage;