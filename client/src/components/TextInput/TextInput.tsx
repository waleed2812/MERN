import * as React from "react";
import { toTitleCase, validateEmail, validatePassword } from "../../config";
import { key_form } from "../../types";
import "./TextInput.css";
type TTextInput = "text" | "password" | "email" | "positive_number";

interface IMyTextInput {
  textInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  state: key_form;
  setState: (prevState: any) => void;
  value: string;
  label?: string;
  type?: TTextInput;
  required?: boolean;
  hideLabel?: boolean;
  helperText?: string;
}

export const TextInput = React.forwardRef<any, IMyTextInput>(
  (
    {
      state,
      setState,
      value,
      textInputProps,
      label,
      type,
      required,
      hideLabel,
      helperText
    },
    ref
  ) => {
    const final_type: TTextInput = !!type ? type : "text";
    const final_label =
      (!!label ? label : toTitleCase(value.split("_").join(" "))) +
      (!!required ? "*" : "");

    const final_placeholder = !!helperText
    ? helperText
    : final_type === 'email'
    ? 'example@domain.com'
    : final_type === 'password'
    ? '*********'
    : final_type === 'positive_number'
    ? '50'
    : 'John';

    const handleChange = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      try {
        setState((prevState: any) => ({
          ...prevState,
          [event.target.name]: event.target.value,
          [`is_valid_${event.target.name}`]: !!event.target.value,
        }));
      } catch (err) {
        // console.error(err);
      }
    };

    const handleChangeEmail = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      try {
        setState((prevState: any) => ({
          ...prevState,
          [event.target.name]: event.target.value,
          [`is_valid_${event.target.name}`]:
            !!event.target.value && validateEmail(event.target.value),
        }));
      } catch (err) {
        // console.error(err);
      }
    };

    const handleChangePassword = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      try {
        const pass = validatePassword(event.target.value);
        setState((prevState: any) => ({
          ...prevState,
          [value]: pass,
          [`is_valid_${value}`]: true,
        }));
      } catch (err) {
        // console.error(err);
        setState((prevState: any) => ({
          ...prevState,
          [value]: event.target.value,
          [`is_valid_${value}`]: false,
        }));
      }
    };

    const handleChangePositiveNumber = (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      try {
        const target_value = event.target.value;
        const new_input = Number.parseInt(target_value, 10);

        if (target_value.length === 0) {
          setState((prevState: any) => ({
            ...prevState,
            [value]: "",
            [`is_valid_${value}`]: false,
          }));
          return;
        } else if (isNaN(new_input) || new_input < 0) {
          return;
        }

        setState((prevState: any) => ({
          ...prevState,
          [value]: new_input,
          [`is_valid_${value}`]: !!new_input,
        }));
      } catch (err) {
        // console.error(err);
      }
    };

    const toggleSecure = (): void => {
      setState((prevState: any) => ({
        ...prevState,
        [`secureTextEntry_${value}`]: prevState[`secureTextEntry_${value}`] === false,
      }));
    };

    return (
      <>
        {!hideLabel && <p className="text-input-label">{final_label}</p>}
        <div className="input-div">
          <input
            className="input"
            onChange={
              final_type === "text"
                ? handleChange
                : final_type === "email"
                ? handleChangeEmail
                : final_type === "password"
                ? handleChangePassword
                : handleChangePositiveNumber
            }
            type={
              final_type === "positive_number"
                ? "number"
                : final_type === "password" && state[`secureTextEntry_${value}`] === false
                ? "text"
                : final_type
            }
            ref={ref}
            value={
              final_type === "password" ? undefined : state[value]?.toString()
            }
            required={required}
            placeholder={final_placeholder}
            id={value}
            name={value}
            {...textInputProps}
          />
          {final_type === "password" && (
            <>
              {state[`secureTextEntry_${value}`] === false ? (
                <svg
                  onClick={toggleSecure}
                  className={"text_input_eye"}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 8.125C19.7375 8.125 23.9625 10.7875 26.025 15C23.9625 19.2125 19.75 21.875 15 21.875C10.25 21.875 6.0375 19.2125 3.975 15C6.0375 10.7875 10.2625 8.125 15 8.125ZM15 5.625C8.75 5.625 3.4125 9.5125 1.25 15C3.4125 20.4875 8.75 24.375 15 24.375C21.25 24.375 26.5875 20.4875 28.75 15C26.5875 9.5125 21.25 5.625 15 5.625ZM15 11.875C16.725 11.875 18.125 13.275 18.125 15C18.125 16.725 16.725 18.125 15 18.125C13.275 18.125 11.875 16.725 11.875 15C11.875 13.275 13.275 11.875 15 11.875ZM15 9.375C11.9 9.375 9.375 11.9 9.375 15C9.375 18.1 11.9 20.625 15 20.625C18.1 20.625 20.625 18.1 20.625 15C20.625 11.9 18.1 9.375 15 9.375Z"
                    fill="#1E0338"
                  />
                </svg>
              ) : (
                <svg
                  onClick={toggleSecure}
                  className={"text_input_eye"}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7.5C19.7375 7.5 23.9625 10.1625 26.025 14.375C25.2875 15.9 24.25 17.2125 23.0125 18.275L24.775 20.0375C26.5125 18.5 27.8875 16.575 28.75 14.375C26.5875 8.8875 21.25 5 15 5C13.4125 5 11.8875 5.25 10.45 5.7125L12.5125 7.775C13.325 7.6125 14.15 7.5 15 7.5ZM13.6625 8.925L16.25 11.5125C16.9625 11.825 17.5375 12.4 17.85 13.1125L20.4375 15.7C20.5375 15.275 20.6125 14.825 20.6125 14.3625C20.625 11.2625 18.1 8.75 15 8.75C14.5375 8.75 14.1 8.8125 13.6625 8.925ZM2.5125 4.8375L5.8625 8.1875C3.825 9.7875 2.2125 11.9125 1.25 14.375C3.4125 19.8625 8.75 23.75 15 23.75C16.9 23.75 18.725 23.3875 20.4 22.725L24.675 27L26.4375 25.2375L4.275 3.0625L2.5125 4.8375ZM11.8875 14.2125L15.15 17.475C15.1 17.4875 15.05 17.5 15 17.5C13.275 17.5 11.875 16.1 11.875 14.375C11.875 14.3125 11.8875 14.275 11.8875 14.2125V14.2125ZM7.6375 9.9625L9.825 12.15C9.5375 12.8375 9.375 13.5875 9.375 14.375C9.375 17.475 11.9 20 15 20C15.7875 20 16.5375 19.8375 17.2125 19.55L18.4375 20.775C17.3375 21.075 16.1875 21.25 15 21.25C10.2625 21.25 6.0375 18.5875 3.975 14.375C4.85 12.5875 6.125 11.1125 7.6375 9.9625Z"
                    fill="#1E0338"
                  />
                </svg>
              )}
            </>
          )}
        </div>
      </>
    );
  }
);

export default TextInput;