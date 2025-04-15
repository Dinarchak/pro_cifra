import React, { useCallback, useState } from "react";
import authService from "../../../services/authService";
import styles from './.module.css'
import FormInput from "../../UI/FormInput/Input";
import Select, { SingleValue } from "react-select";
import uniService from "../../../services/uniService";
import University from "../../../models/university";
import usePooling from "../../../hooks/usePooling";
import { useNavigate } from "react-router";


type OptionType = {
  value: string,
  label: string
}

const RegisterPage: React.FC = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [university, setUniversity] = useState<OptionType | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [universities, setUniversities] = useState<OptionType[]>([]);

  const fetchData = useCallback(async () => {
    const data: University[] = await uniService.getAllUniversities();
    const options: OptionType[] = data.map((uni) => {
     return {value: uni.university, label: uni.university}
    });
    setUniversities(options);
  }, [])

  usePooling(10000, fetchData);

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
              university: university ? university.value : ""
            });
            console.log("Запрос обработан")
            navigate('/login');
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
          <div className={styles.inputGroup}>
            <label>Университет</label>
            <div className={styles.field}>
              <Select<OptionType>
              options={universities}
              value={university}
              placeholder="СПбГУ"
              onChange={(selected: SingleValue<OptionType>) => {setUniversity(selected)}}
              isClearable
              required/>
            </div>
          </div>
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