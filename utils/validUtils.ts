export const validEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const checkPassword = (newPassword: string, confirmPassword: string) => {
  return newPassword === confirmPassword;
};
