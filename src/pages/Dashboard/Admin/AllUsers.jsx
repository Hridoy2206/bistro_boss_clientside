import SectionHeading from "../../../components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: usersData = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/user")
            return res.data;
        }
    });

    const handleMakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/user/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            console.log(res);
                            refetch()
                            Swal.fire({
                                title: "Admin!",
                                text: ` The user has admin now`,
                                icon: "success",
                                timer: 1000
                            });
                        }

                    })
            }
        });
    }

    //* User delete Method
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                timer: 1000
                            });
                        }

                    })
            }
        });
    }

    // if (isLoading) {
    //     return <p>Loading...</p>
    // }
    return (
        <div>
            <>
                {
                    usersData.length ?
                        <div className="lg:w-10/12 overflow-hidden mx-auto">
                            <SectionHeading subheading="My cart" heading="Wanna add more?" />
                            <div className='bg-white lg:p-8 p-2 mt-16 rounded-md w-full'>
                                <Helmet>
                                    <title>Bistro Boss | All Users</title>
                                </Helmet>
                                <div className="lg:text-3xl text-xl flex  mb-8 w-full ">
                                    <h2 className='grow'>Total Users: {usersData.length}</h2>
                                </div>

                                <div>
                                    <div className="relative overflow-x-auto shadow-md lg:rounded-2xl rounded-t-xl">
                                        <div style={{ maxHeight: "600px", overflowY: "scroll" }}>
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead className="text-sm text-white uppercase lg:h-16 h-14 bg-[#D1A054] whitespace-nowrap sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            #
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        usersData.map((user, index) => <tr key={user._id} className="text-gray-900 bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 hover:duration-100">
                                                            <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {user.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {user.email}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-2xl">
                                                                {user.role === "admin" ? <span className="text-sm bg-green-300 p-2 rounded-lg">Admin</span> : <button onClick={() => handleMakeAdmin(user._id)} className=" text-2xl text-white rounded-md bg-[#D1A054]   active:scale-95 duration-300 px-4 py-2 "> <FaUsers /> </button>}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <button onClick={() => handleDeleteUser(user._id)} className=" text-2xl text-white rounded-md bg-red-500 active:scale-95 duration-300 px-4 py-2 "><RiDeleteBin5Line /></button>
                                                            </td>
                                                        </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div> :
                        <h2 className='text-4xl flex items-center justify-center min-h-screen'>Don't have any User yet!</h2>
                }

            </>
        </div>
    );
};

export default AllUsers;