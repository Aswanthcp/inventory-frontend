import FormLogin from "../../components/FormLogin";

import React from "react";

const Login = () => {
  return (
    <div>
      <FormLogin route="token/" method="login" />
    </div>
  );
};

export default Login;
