import axios from "axios";
import { AxiosResponse } from "axios";
import store from "../redux/store";
import { LoginRequest, Poll, Candidate, LoginResponse } from "../types";

class Http {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8000",
    });
  }

  private setHeaders() {
    this.http.defaults.headers["Authorization"] = `Bearer ${
      store.getState().user.token
    }`;
  }

  public signIn(
    requestBody: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> {
    return this.http.post("/auth/token", requestBody);
  }

  public getOngoingPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?ongoing=true");
  }

  public getFuturePolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?future=true");
  }

  public getEndedPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?ended=true");
  }

  public getFutureCreatedPolls(): Promise<AxiosResponse<Poll[]>> {
    this.setHeaders();
    return this.http.get("/poll?future=true&active=true");
  }

  public createPoll(requestBody: Poll): Promise<AxiosResponse<Poll>> {
    this.setHeaders();
    return this.http.post("/poll", requestBody);
  }

  public getPoll(id: number): Promise<AxiosResponse<Poll>> {
    this.setHeaders();
    return this.http.get(`/poll/${id}`);
  }

  public updatePoll(
    id: number,
    requestBody: Poll
  ): Promise<AxiosResponse<Poll>> {
    this.setHeaders();
    return this.http.put(`/poll/${id}`, requestBody);
  }

  public startPoll(id: number): Promise<AxiosResponse<void>> {
    this.setHeaders();
    return this.http.post(`/poll/${id}/start`);
  }

  public getCandidateList(id: number): Promise<AxiosResponse<Candidate[]>> {
    this.setHeaders();
    return this.http.get(`/poll/${id}/candidate`);
  }

  public addCandidateToPoll(
    id: number,
    requestBody: Candidate
  ): Promise<AxiosResponse<Candidate>> {
    this.setHeaders();
    return this.http.post(`/poll/${id}/candidate`, requestBody);
  }

  public getCandidate(
    pollId: number,
    candidateId: number
  ): Promise<AxiosResponse<Candidate>> {
    this.setHeaders();
    return this.http.get(`/poll/${pollId}/candidate/${candidateId}`);
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
