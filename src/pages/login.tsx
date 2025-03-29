import React, { useState } from "react";
import authService from "../services/authServise";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const response = await authService.login({ email, password });
      console.log("Успешный вход", response);
    } catch (error) {
      setError("Ошибка входа. Проверьте введенные данные.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl mb-4 text-center">Вход</h2>
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
          <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-4">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;