import axios from "axios";
import rateLimit from "axios-rate-limit";
import { AxiosResponse } from "axios";
import store from "../redux/store";
import { toast } from "react-toastify";

import {
  LoginRequest,
  Poll,
  Candidate,
  LoginResponse,
  User,
  ChangePasswordRequest,
  GenerateTokensRequest,
} from "../types";
import { refreshToken } from "../redux/user.slice";

class Http {
  private http;
  constructor() {
    this.http = rateLimit(
      axios.create({
        baseURL: "https://api-c2ldbi3axa-ez.a.run.app",
      }),
      { maxRequests: 2, perMilliseconds: 1000 }
    );
    this.http.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          const accessToken = store.getState().user.accessToken;
          if (accessToken) {
            store.dispatch(refreshToken());
          } else {
            window.location.href =
              "https://front-votechain-cpzh2mvr6q-ez.a.run.app";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private setHeaders() {
    this.http.defaults.headers["Authorization"] = `Bearer ${
      store.getState().user.accessToken
    }`;
  }

  public signIn(
    requestBody: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> {
    this.http.defaults.withCredentials = true;
    return this.http.post("/auth/token", requestBody);
  }

  public refreshToken(): Promise<AxiosResponse<LoginResponse>> {
    this.http.defaults.withCredentials = true;
    return this.http.post("/auth/token/refresh");
  }

  public createUser(requestBody: User): Promise<AxiosResponse<User>> {
    this.setHeaders();
    return this.http.post("/admin/user", requestBody);
  }

  public changePassword(
    requestBody: ChangePasswordRequest
  ): Promise<AxiosResponse<ChangePasswordRequest>> {
    this.setHeaders();
    return this.http.put("/voter/password", requestBody);
  }

  public generateTokens(
    pollId: number,
    requestBody: GenerateTokensRequest
  ): Promise<AxiosResponse<GenerateTokensRequest>> {
    this.setHeaders();
    return this.http.post(`/poll/${pollId}/generate_tokens`, requestBody);
  }

  public getUsers(): Promise<AxiosResponse<User[]>> {
    this.setHeaders();
    return this.http.get("/admin/user");
  }

  public getVoterPolls(type: string): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get(`/voter/poll?${type}=true`);
  }

  public getOngoingPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?ongoing=true&active=true");
  }

  public getFuturePolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?future=true&active=true");
  }

  public getEndedPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?ended=true");
  }

  public getCanceledPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?active=false");
  }

  public createPoll(requestBody: Poll): Promise<AxiosResponse<Poll>> {
    this.setHeaders();
    return this.http.post("/poll", requestBody);
  }

  public getPoll(id: number): Promise<AxiosResponse<Poll>> {
    this.setHeaders();
    return this.http.get(`/poll/${id}`);
  }

  public vote(
    pollId: number | undefined,
    candidateId: number,
    token: string
  ): Promise<AxiosResponse<string>> {
    this.setHeaders();
    return this.http.post(
      `/voter/poll/${pollId}/candidate/${candidateId}`,
      token
    );
  }

  public verifyVote(pollId: number): Promise<AxiosResponse<string>> {
    this.setHeaders();
    return this.http.post(`/voter/poll/${pollId}verify`);
  }

  public getVoteResults(pollId: number | undefined) {
    this.setHeaders();
    return this.http.get(`/voter/poll/${pollId}/results`);
  }

  public updatePoll(
    id: number,
    requestBody: Poll
  ): Promise<AxiosResponse<Poll>> {
    console.log(id, requestBody);
    this.setHeaders();
    return this.http.put(`/poll/${id}`, requestBody);
  }

  public startPoll(id: number): Promise<AxiosResponse<void>> {
    this.setHeaders();
    return this.http.post(`/poll/${id}/start`);
  }

  public addCandidateToPoll(
    id: number,
    requestBody: Candidate
  ): Promise<AxiosResponse<Candidate>> {
    this.setHeaders();
    return this.http.post(`/poll/${id}/candidate`, requestBody);
  }

  public deleteCandidate(
    pollId: number,
    candidateId: number
  ): Promise<AxiosResponse<void>> {
    this.setHeaders();
    return this.http.delete(`/poll/${pollId}/candidate/${candidateId}`);
  }
}

export default Http;
