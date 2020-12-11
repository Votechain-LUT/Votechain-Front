import axios from "axios";
import { LoginRequest } from "../types/login.types";

class Http {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8000/core",
    });
  }

  private signIn(requestBody: LoginRequest) {
    return this.http.post("/signIn", requestBody);
  }

  private getOngoingPolls() {
    return this.http.get("/polls?ongoing=true");
  }
}

export default Http;
