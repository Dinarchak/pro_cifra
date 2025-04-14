import axios from "axios";


const api = axios.create({
    baseURL: "http://82.202.142.224:8080/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;