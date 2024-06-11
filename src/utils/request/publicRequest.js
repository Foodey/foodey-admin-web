import { SERVER_HOST } from "../../constants/config";
import axios from "axios";

const publicRequest = axios.create({
  baseURL: SERVER_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicRequest;
