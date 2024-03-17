import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user, loading } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isLoading: adminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`);
            console.log(res.data);
            return res?.data?.admin;
        }
    })
    return [isAdmin, adminLoading];
};

export default useAdmin;