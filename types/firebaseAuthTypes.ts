export type CreateUserCredentials = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
};

export type UserLoginCredentials = {
  email: string;
  password: string;
};
