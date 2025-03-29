import React, { useState } from "react";
import axios from "axios";
import authService from "../services/authServise";


const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      const response = await authService.register({email, password});
      console.log("Успешная регистрация", response);
    } catch (error) {
      setError("Ошибка регистрации. Попробуйте снова.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Регистрация</h2>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mt-4"
          />
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full mt-4"
          />
          <button type="submit" className="bg-green-500 text-white p-2 w-full mt-4">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;