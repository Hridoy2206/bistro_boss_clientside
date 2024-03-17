import { FaFacebookF } from 'react-icons/fa';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn, setLoading } = useAuth();
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleLogin = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    role: "user"
                }
                axiosPublic.post("/user", userInfo)
                    .then(res => {
                        console.log(res);
                        toast.success("User login successfully!");
                        navigate(from, { replace: true });
                    })
            }).catch(error => {
                setLoading(false)
                toast.error(error?.message);
                console.log(error?.message);
            })
    }
    return (
        <div>
            {/* -----------Social medea sign in-------------*/}
            <div className="flex gap-5 justify-center text-center w-full mx-auto">
                <div className="text-2xl border border-gray-400 p-2 rounded-full cursor-pointer active:scale-105 duration-300 transition-all ">
                    <FaFacebookF />
                </div>
                <div onClick={handleGoogleLogin} className="text-2xl border border-gray-400 p-2 rounded-full cursor-pointer active:scale-105 duration-300 transition-all hover:bg-gray-200">
                    <BsGoogle />
                </div>
                <div className="text-2xl border border-gray-400 p-2 rounded-full cursor-pointer active:scale-105 duration-300 transition-all ">
                    <BsGithub />
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;