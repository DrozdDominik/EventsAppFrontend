export const validatePassword = (password: string): boolean =>
  /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{7,15}$/.test(password);
