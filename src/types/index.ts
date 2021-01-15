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
};

export type User = {
  id?: number;
  username: string;
  password?: string;
  email: string;
};
