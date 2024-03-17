import { useContext } from "react";
import { AuthContaxt } from "../provider/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContaxt);
    return auth
};

export default useAuth;