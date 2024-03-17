import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';

const FoodCard = ({ items }) => {
    const { name, image, recipe, _id, price } = items;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch, isLoading] = useCart();

    const handleAddToCart = () => {

        if (user && user.email) {
            const menuItem = {
                menuId: _id,
                email: user?.email,
                name,
                image,
                price
            }

            axiosSecure.post("/carts", menuItem)
                .then(res => {
                    if (res.data.success == false) {
                        toast.error(res.data.message, 2000)
                    } else {
                        toast.success(res.data.message, 2000)
                    }
                    refetch();
                });
        } else {
            Swal.fire({
                title: "Login first",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }

    return (
        <div key={_id} className=" w-full p-6 shadow-lg space-y-4 rounded-lg relative">
            <img alt="Product Image" className="lg:w-[350px] w-full lg:h-[275px] object-cover  rounded-lg " src={image} />
            <button className="bg-[#0095FF] hover:bg-[#0095FF]/90 duration-200 text-white font-medium px-3 py-1 rounded-xl absolute top-5 right-12">${price}</button>
            <div className="grid gap-2">
                <h1 className="text-lg font-semibold ">{name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 lg:h-[55px]">{recipe}</p>
            </div>
            <div className="flex gap-4">
                <button onClick={handleAddToCart} className="px-6 py-2 bg-slate-800 text-white rounded-lg font-semibold md:text-base sm:text-sm text-[12px] hover:bg-slate-950">Add to Cart</button>
            </div>
        </div>
    );
};

export default FoodCard;