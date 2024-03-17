import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { IoIosWallet } from 'react-icons/io';
import { FaCarSide, FaShapes, FaUsers } from 'react-icons/fa';
import AdminChart from './AdminChart';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data = [] } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats")
            return res.data
        }
    })
    console.log(data);
    return (
        <div>
            <h2 className="lg:text-4xl text-3xl uppercase font-serif mb-6">Hi, welcome back</h2>
            <div className='grid lg:grid-cols-4 gap-8'>
                <div className='text-white bg-gradient-to-r from-[#BD3AF5] to-[#F9D4FF] rounded-md py-10 px-14 flex gap-8 items-center '>
                    <div className='text-6xl'>
                        <IoIosWallet />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl font-bold text-center'>{data.revinue}</span>
                        <span className='text-xl'>Revinue</span>
                    </div>
                </div>
                <div className='text-white bg-gradient-to-r from-[#D5A55A] to-[#FBE6BD] rounded-md py-10 px-14 flex gap-8 items-center '>
                    <div className='text-6xl'>
                        <FaUsers />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl font-bold text-center'>{data.users}</span>
                        <span className='text-xl'>Customers</span>
                    </div>
                </div>
                <div className='text-white bg-gradient-to-r from-[#FE4F86] to-[#FECAE6] rounded-md py-10 px-14 flex gap-8 items-center '>
                    <div className='text-6xl'>
                        <FaShapes />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl font-bold text-center'>{data.revinue}</span>
                        <span className='text-xl'>Products</span>
                    </div>
                </div>
                <div className='text-white bg-gradient-to-r from-[#6DB1FF] to-[#B2F3FF] rounded-md py-10 px-14 flex gap-8 items-center '>
                    <div className='text-6xl'>
                        <FaCarSide />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-5xl font-bold text-center'>{data.orders}</span>
                        <span className='text-xl'>Orders</span>
                    </div>
                </div>
            </div>

            <AdminChart />
        </div>
    );
};

export default AdminHome;