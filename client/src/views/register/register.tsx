import { TextInput } from "../../components";
import React from "react";
import { key_form } from "../../types";
import "./register.css";
import { APIManager } from "../../config";
import { useDispatch } from "react-redux";
import { login } from "../../redux";

export const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<key_form>({
    username: "",
    is_valid_username: false,
    password: "",
    is_valid_password: false,
    secureTextEntry_password: true,
  });
  const [error, setError] = React.useState<string>();

  const submit = async () => {
    try {
      if(!state.is_valid_email) {
        throw new Error("Invalid Email")
      }
      if(!state.is_valid_password) {
        throw new Error("Invalid Password")
      }
      const res = await new APIManager().register(JSON.stringify(state));
      dispatch(login(res.data.user));
      console.log(res);
    } catch(err: any) {
      console.error(err);
      setError(err?.message ? JSON.stringify(err.message) : JSON.stringify(err))
    }
  }

  return (
    <div style={{ flexDirection: "column" }}>
      <p>Register</p>
      <TextInput state={state} setState={setState} value={'email'} type={"email"} required/>
      <TextInput state={state} setState={setState} value={'username'} type={"text"} />
      <TextInput state={state} setState={setState} value={'first_name'} type={"text"} />
      <TextInput state={state} setState={setState} value={'last_name'} type={"text"} />
      <TextInput state={state} setState={setState} value={'password'} type={"password"} required/>
      {!!error && <span>{error}</span>}
      <button onClick={submit} >Submit</button>
      <a href="/login">Login</a>
    </div>
  );
};

export default Register;
