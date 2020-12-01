import axios from "axios";
import { LoginRequest } from "../types/login.types";

class Http {
  private http;
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:4000",
    });
  }

  private signIn(requestBody: LoginRequest) {
    return this.http.post("/signIn", requestBody);
  }
}

export default Http;
