import axios from "axios";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3MjZmM2IyNmQzZDAwYzliMWRkZSIsImlhdCI6MTcyODU2OTgyMywiZXhwIjoxNzMxMTYxODIzfQ.oKD94i8c5_-jS2DdqmKzHtSwYlGI58_UG31YRV0RyC4";

const instance = axios.create({
  baseURL: "https://daily-grid-rest-api.onrender.com/api",
  headers: {
    Authorization: token,
    "Content-Type": "application/json",
  },
});

export default instance;
