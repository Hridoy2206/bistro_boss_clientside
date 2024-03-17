import { FaUtensils } from 'react-icons/fa';
import SectionHeading from '../../../components/SectionHeading';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../loadingAnimation.json"

const image_hosting_key = import.meta.env.VITE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AdItem = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(res.data);
        setImageUrl(res.data)
        console.log(data);
        setLoading(true);

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }

            const uploadRes = await axiosSecure.post("/menu", menuItem)
            if (uploadRes.data.insertedId) {
                reset();
                toast.success(`${data.name} is added on the menu's`);
                setLoading(false);
                console.log(uploadRes.data);
            }
        }
    }

    if (loading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }
    return (
        <div>
            <SectionHeading subheading={"--- What's New ---"} heading={"Ad an Item"} />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 lg:w-7/12 mx-auto lg:p-12 p-4 bg-[#F3F3F3]'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="recipe-name" className='text-gray-600 font-semibold'>Recipe name*</label>
                    <input type="text"
                        placeholder='recipe name'
                        className='outline-none p-3'
                        {...register("name", { required: true })}
                    />
                </div>

                <div className='flex justify-between gap-8'>
                    <div className='flex flex-col space-y-2 w-1/2'>
                        <label htmlFor="recipe-name" className='text-gray-600 font-semibold'>Cetegory*</label>
                        <select
                            className='outline-none p-3 text-gray-600'
                            {...register("category", { required: true })}
                        >

                            <option disabled>cetegory</option>
                            <option>pizza</option>
                            <option>salad</option>
                            <option>soup</option>
                            <option>dessert</option>
                            <option>drinks</option>
                        </select>
                    </div>
                    <div className='flex flex-col space-y-2 w-1/2'>
                        <label htmlFor="price" className='text-gray-600 font-semibold'>Price*</label>
                        <input
                            type="number"
                            placeholder='Price'
                            className='outline-none p-3'
                            {...register("price", { required: true })}
                        />
                    </div>
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor="recipe-details" className='text-gray-600 font-semibold'> Recipe Details*</label>
                    <textarea
                        rows={5}
                        placeholder='Recipe details'
                        className='outline-none p-3 text-gray-600 resize-none'
                        {...register("recipe", { required: true })}
                    />
                </div>

                <div>
                    <input type="file"
                        name="chose file"
                        id=""
                        className="text-sm text-stone-500 file:mr-5 file:py-3 file:px-6 file:border-none file:text-base file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 "
                        {...register("image", { required: true })}
                    />
                    {/* <img className='w-44 h-44 rounded-full object-cover' src={imageUrl?.data?.display_url} alt="" /> */}
                </div>

                <div>
                    <button type='submit' className=' px-10 py-3 bg-gradient-to-r from-[#865F24] to-[#B48030] text-white flex gap-2 items-center font-semibold'>
                        <span> Add Item</span> <FaUtensils />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdItem;