import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionHeading from '../../../components/SectionHeading';
import { Helmet } from 'react-helmet-async';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: payment = [] } = useQuery({
        queryKey: ["payment", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            console.log(res);
            return res.data
        }
    });
    console.log(payment);
    return (
        <div>
            <div className="lg:w-10/12 overflow-hidden mx-auto">
                <SectionHeading subheading="Hurry up" heading="Manage Item" />
                <div className='bg-white lg:p-8 p-2 mt-16 rounded-md w-full'>
                    <Helmet>
                        <title>Bistro Boss | user | payment-history </title>
                    </Helmet>
                    <div className="lg:text-3xl text-xl flex  mb-8 w-full ">
                        <h2 className='grow'>Total Payments: {payment.length}</h2>
                    </div>

                    <div>
                        <div className="relative overflow-x-auto shadow-md lg:rounded-2xl rounded-t-xl">
                            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-sm text-white uppercase lg:h-16 h-14 bg-[#D1A054] whitespace-nowrap sticky top-0">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                #
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Transection Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Booking date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            payment.map((item, index) => <tr key={item._id} className=" text-gray-900 bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 hover:duration-100">
                                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.transectionId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.data}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {item.status}
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;