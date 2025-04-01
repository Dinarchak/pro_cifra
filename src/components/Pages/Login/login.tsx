import React, { useState } from "react";
import Auth from "../../Widgets/Auth/Auth";

const LoginPage: React.FC = () => {
  return Auth({type:"login"});
};

export default LoginPage;