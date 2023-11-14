import axios from "axios";
import { Note } from "../models/note";
import { User } from "../models/user";
// import Cookies from "js-cookie";

// const apiUrl = "https://epidaure-api-preprod.herokuapp.com";
const apiUrl = "http://localhost:5000";
// eslint-disable-next-line react-refresh/only-export-components
const API = axios.create({ withCredentials: true, baseURL: apiUrl });

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

export interface NoteInput {
  title: string,
  text: string,
}

export interface SignUpCredentials {
  username: string,
  email: string,
  password: string,
}

export interface LoginCredentials {
  username: string,
  password: string,
}

export default class APIManager {

  // --------------- Notes ---------------

  static async loadNotes() {
    const response = await API.get("/api/notes");
    return response.data;
  }

  static async createNote(note: NoteInput): Promise<Note> {
    const response = await API.post("/api/notes", JSON.stringify(note));
    return response.data;
    // return response.json();
  }

  static async updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await API.patch("/api/notes/" + noteId, JSON.stringify(note));
    return response.data;
  }

  static async deleteNote(noteId: string) {
    const response = await API.delete("/api/notes/" + noteId)
    return response.data;
  }


  // --------------- Users ---------------
  // Need credentials in the header if front and back are on differents domain / sub-domains
  static async getLoggedInUser(): Promise<User> {
    const response = await API.get("/api/users");
    return response.data;
  }

  static async signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await API.post("/api/users/signup", JSON.stringify(credentials));
    return response.data;
  }

  static async login(credentials: LoginCredentials): Promise<User> {
    const response = await API.post("/api/users/login", JSON.stringify(credentials));
    return response.data;
  }

  static async logout() {
    const response = await API.post("/api/users/logout");
    return response.data;
  }


}
