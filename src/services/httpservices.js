import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectederror =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectederror) {
    console.log("Logging expcetion", error);
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete
};
