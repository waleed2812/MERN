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
    confirm_password: "",
    is_valid_confirm_password: false,
    secureTextEntry_confirm_password: true,
  });
  const [error, setError] = React.useState<string>();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      if (!state.is_valid_email) {
        throw new Error("Invalid Email");
      }
      if (!state.is_valid_password) {
        throw new Error("Invalid Password");
      }
      if (state.password !== state.confirm_password) {
        throw new Error("Passwords Do Not Match.");
      }
      const res = await new APIManager().register(JSON.stringify(state));
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
      <p>Register</p>
      <form>
        <TextInput
          state={state}
          setState={setState}
          value={"email"}
          type={"email"}
          textInputProps={{
            autoComplete: "email"
          }}
          required
        />
        <TextInput
          state={state}
          setState={setState}
          value={"username"}
          textInputProps={{
            autoComplete: "username"
          }}
          type={"text"}
        />
        <TextInput
          state={state}
          setState={setState}
          value={"first_name"}
          textInputProps={{
            autoComplete: "first-name"
          }}
          type={"text"}
        />
        <TextInput
          state={state}
          setState={setState}
          value={"last_name"}
          textInputProps={{
            autoComplete: "last-name"
          }}
          type={"text"}
        />
        <TextInput
          state={state}
          setState={setState}
          value={"password"}
          type={"password"}
          textInputProps={{
            autoComplete: "new-password"
          }}
          required
        />
         <TextInput
          state={state}
          setState={setState}
          value={"confirm_password"}
          type={"password"}
          textInputProps={{
            autoComplete: "new-password"
          }}
          required
        />
        {!!error && <span>{error}</span>}
        <button onClick={submit}>Submit</button>
      </form>
      <a href="/login">Login</a>
    </div>
  );
};

export default Register;
