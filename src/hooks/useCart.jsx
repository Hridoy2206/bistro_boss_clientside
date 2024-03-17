import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: cartData = [], refetch, isLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })
    return [cartData, refetch, isLoading];
};

export default useCart;