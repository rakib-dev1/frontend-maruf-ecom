import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://server-maruf-ecom.vercel.app",
});
const AxiosPublic = () => {
  return axiosPublic;
};

export default AxiosPublic;
