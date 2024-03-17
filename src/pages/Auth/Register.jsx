import React, { useContext, useState } from 'react';
import registerImg from "../../assets/others/authentication2.png"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContaxt } from '../../provider/AuthProvider';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import loadingAnimation from "../../loadingAnimation.json"
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SocialLogin from '../../components/SocialLogin';

const Register = () => {
    const { createUser, updateUserInfo } = useContext(AuthContaxt);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [registerLoading, setRegisterLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        console.log(data);
        setRegisterLoading(true);
        createUser(data.email, data.password)
            .then(result => {
                const logedUser = result.user;
                console.log(logedUser);
                updateUserInfo(data.name)
                    .then(() => {

                        const userInfo = {
                            email: data.email,
                            name: data.name,
                            role: "user"
                        }
                        axiosPublic.post("/user", userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data?.result?.insertedId) {
                                    toast.success(res.data.message);
                                    reset();
                                    navigate('/');
                                    setRegisterLoading(false);
                                }
                            })
                    }).catch(error => {
                        console.log(error);
                        setRegisterLoading(false);
                        console.log(registerLoading);
                    })
            })
            .catch(error => {
                setErrorMessage(error.message);
                setRegisterLoading(false);
            });
    }

    if (registerLoading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='h-screen  bg-orange-50 flex flex-col justify-center items-center lg:space-y-6 space-y-3 p-4'>
                <h2 className='text-4xl font-semibold mt-14'>Sign Up</h2>
                <div className='space-y-2 lg:w-[400px] w-full'>
                    <label htmlFor="name" className='block font-semibold' >Name</label>
                    <input type="text" {...register("name", { required: true })} name="name" id="" placeholder='type here' className='outline-none p-3 w-full' />

                    {/* errors will return when field validation fails  */}
                    {errors.name && <span className='text-red-500 mt-2'>Name is required</span>}
                </div>

                <div className='space-y-2 lg:w-[400px] w-full'>
                    <label htmlFor="email" className='block font-semibold' >Email</label>
                    <input type="email" {...register("email", { required: true })} name="email" id="" placeholder='type here' className='outline-none p-3 w-full' />

                    {/* errors will return when field validation fails  */}
                    {errors.email && <span className='text-red-500 mt-2'>Email is required</span>}
                </div>

                <div className='space-y-2 lg:w-[400px] w-full relative'>
                    <label htmlFor="email" className='block font-semibold' >Password</label>
                    <input type={showPassword ? "text" : "password"} {...register("password", { required: true })} name="password" id="" placeholder='type here' className='outline-none p-3 w-full' />

                    <span className='absolute top-[38px] right-5 text-gray-600 text-xl cursor-pointer' onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    {/* errors will return when field validation fails  */}
                    {errors.password && <span className='text-red-500 mt-2'>Pasword is required</span>}
                    {errorMessage && <span className='text-red-500 mt-2'>{errorMessage}</span>}
                </div>
                <div className='lg:w-[400px] w-full'>
                    <input type="submit" value="Sign Up" className='mt-4 w-full bg-yellow-600 rounded-md outline-none text-white py-3 cursor-pointer' />
                </div>
                <p className="text-[#e2b56b] text-center">Already Registered? <Link to="/login" className='underline font-bold'>Go to login</Link> </p>

                <SocialLogin />
            </form>
        </div>
    );
};

export default Register;