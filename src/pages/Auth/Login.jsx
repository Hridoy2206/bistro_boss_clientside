import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loadingAnimation from "../../loadingAnimation.json"
import { AuthContaxt } from '../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../components/SocialLogin';
const Login = () => {
    const capchaRef = useRef();
    const [disabled, setDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [loginError, setLoginError] = useState("");
    const { signInUser, loading, setLoading } = useContext(AuthContaxt);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const location = useLocation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        console.log(data);
        signInUser(data.email, data.password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                toast.success("User login successfully!");
                navigate(from, { replace: true });
            }).catch(error => {
                setLoading(false);
                setLoginError(error.message);
                console.log(error.message);
            })
    }

    // const handleCapchaValidate = () => {
    //     const user_capcha_value = capchaRef.current.value;
    //     if (validateCaptcha(user_capcha_value)) {
    //         setDisabled(false)
    //     }
    //     else {
    //         setDisabled(true)
    //     }
    // }

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, []);

    if (loading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='min-h-screen bg-orange-50 flex flex-col justify-center items-center lg:space-y-6 space-y-3 p-4'>
                <h2 className='text-4xl font-semibold mt-14'>Login</h2>
                <div className='space-y-2 lg:w-[400px] w-full'>
                    <label htmlFor="email" className='block font-semibold' >Email</label>
                    <input type="email" {...register("email", { required: true })} name="email" id="" placeholder='type here' className='outline-none p-3 w-full' />
                </div>
                <div className='space-y-2 lg:w-[400px] w-full relative'>
                    <label htmlFor="password" className='block font-semibold'>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: true })}
                        name="password"
                        id="password"
                        placeholder='type here'
                        className='outline-none p-3 w-full'
                    />
                    <span className='absolute top-[38px] right-5 text-gray-600 text-xl cursor-pointer' onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* <div className='space-y-2 lg:w-[400px] w-full'>
                    <LoadCanvasTemplate />
                    <input type="text" ref={capchaRef} name="capcha" id="" placeholder='type here' className='outline-none p-3 w-full' />
                </div> */}

                <div className='lg:w-[400px] w-full'>
                    {/* <input onClick={handleCapchaValidate} value="Valided capcha" className='mt-0 w-full outline outline-blue-400 rounded-md text-black py-1 cursor-pointer text-center' /> */}
                    {loginError && <p className='mt-3 text-red-500'>{loginError}</p>}
                </div>

                <div className='lg:w-[400px] w-full'>
                    <input type="submit" value="Login" className={'mt-4 w-full  rounded-md outline-none text-white py-3 cursor-pointer bg-yellow-600'} />
                </div>


                <p className="text-[#e2b56b] text-center">Don't have an account? <Link to="/register" className='underline font-bold'>Please Register</Link> </p>
                <SocialLogin />
            </form>

        </div>
    );
};

export default Login;