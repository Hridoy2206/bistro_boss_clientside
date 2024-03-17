import React from 'react';
import SectionHeading from '../../../components/SectionHeading';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../loadingAnimation.json"
import { useNavigate } from 'react-router-dom';

const ManageItem = () => {
    const [menu, loading, refetch] = useMenu();
    const navigate = useNavigate();
    console.log(menu);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${id}`)
                console.log(res.data);

                if (res.data.deletedCount > 0) {
                    refetch()
                    toast.success("Item deleted successfully!")
                }

            }
        });
    }

    const handleUpdateItem = () => {

    }

    if (loading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }
    return (
        <div>
            {
                menu.length ?
                    <div className="lg:w-10/12 overflow-hidden mx-auto">
                        <SectionHeading subheading="Hurry up" heading="Manage Item" />
                        <div className='bg-white lg:p-8 p-2 mt-16 rounded-md w-full'>
                            <Helmet>
                                <title>Bistro Boss | Manage item</title>
                            </Helmet>
                            <div className="lg:text-3xl text-xl flex  mb-8 w-full ">
                                <h2 className='grow'>Total Menu's: {menu.length}</h2>
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
                                                        Item Image
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Item Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Update item
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    menu.map((item, index) => <tr key={item._id} className=" text-gray-900 bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 hover:duration-100">
                                                        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                                                            {index + 1}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            <img src={item.image} className='w-16 h-12 object-cover rounded-lg' alt="" />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {item.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {item.price}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button onClick={() => navigate(`/dashboard/admin/edit-item/${item._id}`, { state: { item } })} className=" text-2xl text-white rounded-md bg-yellow-500 active:scale-95 duration-300 px-4 py-2 "><FaEdit /></button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <button onClick={() => handleDelete(item._id)} className=" text-2xl text-white rounded-md bg-red-500 active:scale-95 duration-300 px-4 py-2 "><RiDeleteBin5Line /></button>
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
                    <h2 className='text-4xl flex items-center justify-center min-h-screen'>Don't have item in the cart!</h2>
            }
        </div>
    );
};

export default ManageItem;