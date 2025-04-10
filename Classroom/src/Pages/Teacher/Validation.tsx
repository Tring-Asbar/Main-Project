export const userNameValidation = {
  startsWithAlphabet: (value: string) =>
    /^[a-zA-Z]/.test(value) || "Username must start with alphabets",

  alphanumeric: (value: string) =>
    /^[a-zA-Z0-9@._-]+$/.test(value) || "Username must contain alphanumeric characters, '@', '.', '-', and '_'",

  consecutiveCharacters: (value: string) =>
    /(?!.*([@._-])\1\1)/.test(value) || "Username cannot contain more than two consecutive '@', '.', '-', or '_'",

  onlyNumbers: (value: string) =>
    /^(?!\d+$)/.test(value) || "Username cannot be only numbers",

  minLength: (value: string) =>
    /^.{6,}$/.test(value) || "Username should be at least 6 characters",

  maxLength: (value: string) =>
    /^.{0,50}$/.test(value) || "Username should not exceed 50 characters",
};
  
export const passwordValidation = {
  NoSpaces : (value : string) =>
    /^\S*$/.test(value) || "Enter a valid password",
  minLength: (value : string) =>
    /^.{8,}$/.test(value) || "Password should be at least 8 characters",
  maxLength: (value : string) =>
    /^.{0,30}$/.test(value) || "Password should not exceed 30 characters",
  // specialCharactersUpperLowerNumber: (value:string) =>
  //   /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=\\[\]\/`~';])/.test(value) || 
  //           "Password must contain atleast one uppercase letter, lowercase letter, number and special character"

}

  