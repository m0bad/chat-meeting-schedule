export type RegisterData = {
  register: { email: string; token: string; _id: string };
};
export type RegisterVars = {
  email: string;
  username: string;
  password: string;
};

export type LoginData = { login: { email: string; token: string } };

export type LoginVars = { email: string; password: string };
