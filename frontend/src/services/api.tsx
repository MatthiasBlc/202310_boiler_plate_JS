import axios from "axios";
// import Cookies from "js-cookie";

// const apiUrl = "https://epidaure-api-preprod.herokuapp.com";
const apiUrl = "http://localhost:5000";
// eslint-disable-next-line react-refresh/only-export-components
const API = axios.create({ baseURL: apiUrl });

API.interceptors.request.use(({ headers, ...config }) => ({
  ...config,
  headers: {
    ...headers,
    "Content-Type": "application/json",
    // Authorization: `Bearer ${
    //   headers.Authorization || Cookies.get("epidaure_id")
    // }`,
  },
}));

export default class APIManager {
  static async loadNotes() {
    const response = await API.get("/api/notes");
    return response.data;
  }
}
