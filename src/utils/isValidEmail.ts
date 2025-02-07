const re = /\S+@\S+\.\S+/;

export const isValidEmail = (email: string): boolean => re.test(email);
