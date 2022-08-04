export const validateEmail = function (email: string): boolean {
  return RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}").test(email);
};

export const validatePassword = function (password: string): string {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }
  if (password.search(/[0-9]/) === -1) {
    throw new Error("Password must include a digit.");
  }
  if (password.search(/[a-z]/) === -1) {
    throw new Error("Password must include a lowercase letter.");
  }
  if (password.search(/[A-Z]/) === -1) {
    throw new Error("Password must include an uppercase letter.");
  }
  if (password.search(/[^0-9a-zA-Z]/) === -1) {
    throw new Error("Password must include a special character.");
  }
  return password;
};

export const toTitleCase = (str: string): string => {
  const split = str.split(" ");
  let final = "";
  split.forEach(
    (item) =>
      (final +=
        item[0].toUpperCase() + item.substring(1).toLocaleLowerCase() + " ")
  );
  return final;
};