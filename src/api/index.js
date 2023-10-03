import axios from "axios";

const API = axios.create({ 
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// export const signIn = (data) => API.post("/users/login", data);
// export const testGet = () => API.get("/");

class APIRequests {

  static async mtest() {
    return await API.get(
      "/api/explore/risk/0xeEE27662c2B8EBa3CD936A23F039F3189633e4C8"
    );
  }
}

export default APIRequests;
