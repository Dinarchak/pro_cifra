import React, { useState } from "react";
import Auth from "../../Widgets/Auth/Auth";

const RegisterPage: React.FC = () => {
  return Auth({type:"register"});
};

export default RegisterPage;