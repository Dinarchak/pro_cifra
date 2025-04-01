import React, { useState } from "react";
import Auth from "../components/Auth/Auth";

const RegisterPage: React.FC = () => {
  return Auth({type:"register"});
};

export default RegisterPage;