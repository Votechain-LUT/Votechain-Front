export type LoginRequest = {
  username: string;
  password: string;
};

export type Poll = {
  id?: number;
  title: string;
  start: string;
  candidates?: Candidate[];
  end: string;
};

export type Candidate = {
  id?: number;
  name: string;
};

export type LoginResponse = {
  access: string;
  expires: string;
  isAdmin: string;
};

export type User = {
  id?: number;
  username: string;
  password?: string;
  email: string;
};

export type ChangePasswordRequest = {
  old_password: string;
  password: string;
  confirm_password: string;
};

export type GenerateTokensRequest = {
  users: string[];
};
