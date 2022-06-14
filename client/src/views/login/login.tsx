import { TextInput } from "../../components";
import React from "react";
import { key_form } from "../../types";
import "./login.css";
import { APIManager } from "../../config";
import { useDispatch } from "react-redux";
import { login } from "../../redux";

export const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<key_form>({
    username: "",
    is_valid_username: false,
    password: "",
    is_valid_password: false,
    secureTextEntry_password: true,
  });
  const [error, setError] = React.useState<string>();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      if (!state.is_valid_username) {
        throw new Error("Invalid Email");
      }
      if (!state.is_valid_password) {
        throw new Error("Invalid Password");
      }
      const res = await new APIManager().login(JSON.stringify(state));
      if(res?.success) {
        dispatch(login(res.data));
      } else {
        throw new Error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ? JSON.stringify(err.message) : JSON.stringify(err)
      );
    }
  };

  return (
    <div style={{ flexDirection: "column", paddingLeft: "10px" }}>
      <p>Login</p>
      <form>
        <TextInput
          state={state}
          setState={setState}
          value={"username"}
          type={"text"}
          textInputProps={{
            autoComplete: "username"
          }}
          required
        />
        <TextInput
          state={state}
          setState={setState}
          value={"password"}
          type={"password"}
          textInputProps={{
            autoComplete: "current-password"
          }}
          required
        />
        {!!error && <span>{error}</span>}
        <button onClick={submit}>Submit</button>
      </form>
      <a href="/register">Register</a>
    </div>
  );
};

export default Login;
