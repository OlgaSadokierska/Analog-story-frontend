import axios from "axios";

export const apiAuth = axios.create({
    baseURL: "http://localhost:8080",
});

