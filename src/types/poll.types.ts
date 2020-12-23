import { Candidate } from "./candidate.types";

export type Poll = {
  id: number;
  candidates: Candidate[];
  title: string;
  created: Date;
  start: Date;
  end: Date;
  isActive: boolean;
};

export type CreatePoll = {
  title: string;
  start?: string;
  end: string;
  isActive?: boolean;
};
