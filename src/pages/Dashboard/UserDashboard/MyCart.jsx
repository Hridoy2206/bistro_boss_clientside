import { Helmet } from 'react-helmet-async';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import SectionHeading from '../../../components/SectionHeading';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cartData, refetch] = useCart();
    console.log(cartData);
    const axiosSecure = useAxiosSecure();
    const totalPrice = cartData.reduce((total, item) => total + item.price, 0);

    const handleDelete = id => {
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
                axiosSecure.delete(`/cart/${id}`)
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
    return (
        <>
            {
                cartData.length ?
                    <div className="lg:w-10/12 overflow-hidden mx-auto">
                        <SectionHeading subheading="My cart" heading="Wanna add more?" />
                        <div className='bg-white lg:p-8 p-2 mt-16 rounded-md w-full'>
                            <Helmet>
                                <title>Bistro Boss | My-Cart</title>
                            </Helmet>
                            <div className="lg:text-3xl text-xl flex  mb-8 w-full ">
                                <h2 className='grow'>Total Orders: {cartData.length}</h2>
                                <h2 className='grow'>Total Price: ${totalPrice}</h2>
                                <Link className={``} to="/dashboard/payment">
                                    <button disabled={!cartData.length} className='lg:px-6 px-2 py-1 rounded-lg bg-[#D1A054] text-white active:scale-95 duration-300 disabled:bg-slate-300 disabled:active:scale-100'>Pay</button>
                                </Link>
                            </div>

                            <div>
                                <div className="relative overflow-x-auto shadow-md lg:rounded-2xl rounded-t-xl">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-sm text-white uppercase lg:h-16 h-14 bg-[#D1A054] whitespace-nowrap">
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
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartData.map((cart, index) => <tr key={cart._id} className="text-gray-900 bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-200 hover:duration-100">
                                                    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">
                                                        {index + 1}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <img src={cart.image} className='w-16 h-12 object-cover rounded-lg' alt="" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {cart.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {cart.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button onClick={() => handleDelete(cart._id)} className=" text-2xl text-white rounded-md bg-red-500 active:scale-95 duration-300 px-4 py-2 "><RiDeleteBin5Line /></button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div> :
                    <h2 className='text-4xl flex items-center justify-center min-h-screen'>Don't have item in the cart!</h2>
            }

        </>
    );
};

export default MyCart;