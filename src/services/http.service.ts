import axios from "axios";
import { LoginRequest } from "../types/login.types";

class Http {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8000/core",
    });
  }

  public signIn(requestBody: LoginRequest) {
    return this.http.post("/auth/token/", requestBody);
  }

  public getOngoingPolls() {
    return this.http.get("/poll/");
  }
}

export default Http;
