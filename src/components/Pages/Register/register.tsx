import React, { useState } from "react";
import authService from "../../../services/authServise";
import styles from './.module.css'
import FormInput from "../../UI/FormInput/Input";

const RegisterPage: React.FC = () => {

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [university, setUniversity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(props: React.FormEvent) {
        setError("");
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            console.error("Пароли не совпадают");
            return;
        }

        try {
            const resp = await authService.register({
              email: email,
              password: password,
              fullname: fullname,
              name: login,
              university: university
            });
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
          <FormInput label="ФИО" callback={setFullName} type="text" value={fullname}/>
          <FormInput label="Почта" callback={setEmail} type="email" value={email}/>
          <FormInput label="Университет" callback={setUniversity} type="text" value={university}/>
          <FormInput label="Логин" callback={setLogin} type="text" value={login}/>
          <FormInput label="Пароль" callback={setPassword} type="password" value={password}/>
          <FormInput label="Подтверждение пароля" callback={setConfirmPassword} type="password" value={confirmPassword}/>
          <button type="button" className={styles.button} onClick={submit}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;