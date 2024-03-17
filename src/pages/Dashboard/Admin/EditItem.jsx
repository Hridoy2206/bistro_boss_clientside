import React, { useState } from 'react';
import SectionHeading from '../../../components/SectionHeading';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useMenu from '../../../hooks/useMenu';
import Lottie from 'lottie-react';
import loadingAnimation from "../../../loadingAnimation.json"


const image_hosting_key = import.meta.env.VITE_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const EditItem = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [, , refetch] = useMenu();

    const location = useLocation();
    const { item } = location.state;

    const [imageUrl, setImageUrl] = useState(item.image);
    console.log(imageUrl);

    const onSubmit = async (data) => {
        setLoading(true);

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(res.data);
        setImageUrl(res.data)
        console.log(data);

        const updateData = {
            name: data.name,
            recipe: data.recipe,
            image: res.data.data.display_url,
            category: data.category,
            price: parseFloat(data.price)
        }

        const uploadRes = await axiosPublic.patch(`/menu/${item?._id}`, updateData)
        if (uploadRes.data.modifiedCount > 0) {
            refetch()
            toast.success(`${data.name} is updated on the menu's`);
            setLoading(false);
            console.log(uploadRes.data);
            console.log("update", imageUrl);
        } else {
            console.log("update error");
        }
    }

    // Step 2: Create a state variable to hold the image URL

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // Update the state with the new image file
            // Optionally, update the image URL state to display the selected image
            const url = URL.createObjectURL(file);
            console.log("line number 69", url);
            setImageUrl(url);
        }
    };


    if (loading) {
        return <p className="flex justify-center items-center min-h-screen">
            <span className='h-full'><Lottie animationData={loadingAnimation} /></span>
        </p>
    }
    return (
        <div>
            <SectionHeading heading={"Update item"} />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8 lg:w-7/12 mx-auto lg:p-12 p-4 bg-[#F3F3F3]'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="recipe-name" className='text-gray-600 font-semibold'>Recipe name*</label>
                    <input type="text"
                        defaultValue={item.name}
                        placeholder='recipe name'
                        className='outline-none p-3'
                        {...register("name", { required: true })}
                    />
                </div>

                <div className='flex justify-between gap-8'>
                    <div className='flex flex-col space-y-2 w-1/2'>
                        <label htmlFor="recipe-name" className='text-gray-600 font-semibold'>Cetegory*</label>
                        <select
                            defaultValue={item.category}
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
                            defaultValue={item.price}
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
                        defaultValue={item.recipe}
                        rows={5}
                        placeholder='Recipe details'
                        className='outline-none p-3 text-gray-600 resize-none'
                        {...register("recipe", { required: true })}
                    />
                </div>

                <div>
                    {/* Display the current image if available */}
                    {imageUrl ? (
                        <img src={imageUrl} alt="Current item image" className="w-32 h-32 rounded-lg object-cover" />
                    ) : "hello"}
                    <input
                        type="file"
                        name="chose file"
                        id=""
                        className="text-sm text-stone-500 file:mr-5 file:py-3 file:px-6 file:border-none file:text-base file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 "
                        {...register("image", { required: true })}
                        onChange={handleImageChange}
                    />
                    {/* <img className='w-44 h-44 rounded-full object-cover' src={imageUrl?.data?.display_url} alt="" /> */}
                </div>

                <div>
                    <button type='submit' className=' px-10 py-3 bg-gradient-to-r from-[#865F24] to-[#B48030] text-white flex gap-2 items-center font-semibold'>
                        <span> Update menu</span> <FaUtensils />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditItem;