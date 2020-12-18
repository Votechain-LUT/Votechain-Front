import axios from "axios";
import { LoginRequest } from "../types/login.types";
import store from "../redux/store";
import { CreatePoll } from "../types/poll.types";
import { Candidate } from "../types/candidate.types";

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

  public signIn(requestBody: LoginRequest) {
    return this.http.post("/auth/token", requestBody);
  }

  public getOngoingPolls() {
    this.setHeaders();
    return this.http.get("/poll?ongoing=true");
  }

  public getFuturePolls() {
    this.setHeaders();
    return this.http.get("/poll?future=true");
  }

  public getEndedPolls() {
    this.setHeaders();
    return this.http.get("/poll?ended=true");
  }

  public getFutureCreatedPolls() {
    this.setHeaders();
    return this.http.get("/poll?future=true&active=false");
  }

  public createPoll(requestBody: CreatePoll) {
    this.setHeaders();
    return this.http.post("/poll", requestBody);
  }

  public getPoll(id: number) {
    this.setHeaders();
    return this.http.get(`/poll/${id}`);
  }

  public updatePoll(id: number, requestBody: CreatePoll) {
    this.setHeaders();
    return this.http.put(`/poll/${id}`, requestBody);
  }

  public startPoll(id: number) {
    this.setHeaders();
    return this.http.post(`/poll/${id}/start`);
  }

  public getCandidateList(id: number) {
    this.setHeaders();
    return this.http.get(`/poll/${id}/candidate`);
  }

  public addCandidateToPoll(id: number, requestBody: Candidate) {
    this.setHeaders();
    return this.http.post(`/poll/${id}/candidate`, requestBody);
  }

  public getCandidate(pollId: number, candidateId: number) {
    this.setHeaders();
    return this.http.get(`/poll/${pollId}/candidate/${candidateId}`);
  }

  public deleteCandidate(pollId: number, candidateId: number) {
    this.setHeaders();
    return this.http.delete(`/poll/${pollId}/candidate/${candidateId}`);
  }
}

export default Http;
