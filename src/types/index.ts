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
  name: string;
};

export type ConfirmModalProps = {
  headerTitle?: string;
  message?: string;
  isVisible: boolean;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};
