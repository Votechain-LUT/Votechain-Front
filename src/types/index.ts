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
  isActive: boolean;
};

export type Candidate = {
  id?: number;
  name: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};
