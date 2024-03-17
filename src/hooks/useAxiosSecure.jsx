import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-server-two-sage.vercel.app"
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-token");
        // console.log("request stop  bty inter", token);
        config.headers.Authorization = `Bearer ${token}`
        return config;
    })

    axiosSecure.interceptors.response.use(function (response) {
        // Handle the response
        return response;
    },
        async function (error) {
            // Handle the error
            // console.log("Error caught by interceptor:", error);
            const status = error.response?.status;
            // console.log("Status", status);

            if (status === 401 || status === 403) {
                await logout();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
    return axiosSecure;
};

export default useAxiosSecure;