import { Link, useLocation, useParams } from 'react-router-dom';
import useMenu from '../hooks/useMenu';
import { useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from "../loadingAnimation.json"

const MenuItem = ({ items, title }) => {
    const location = useLocation();
    const isMenu = location.pathname.includes("menu");
    const { category } = useParams();
    const [menu, loading] = useMenu();

    // Step 2: Initialize state variable
    const [showAllMenu, setShowAllMenu] = useState(false);

    // Step 3: Create function to toggle menu visibility
    const toggleMenuVisibility = () => {
        setShowAllMenu(!showAllMenu);
    };


    return (
        <div className='mb-12 lg:mb-24'>

            <div className="grid lg:grid-cols-2 gap-12">
                {
                    items?.map(item =>
                        <div key={item._id} className='flex lg:space-x-4 space-x-1 lg:mx-16 mx-2'>
                            <img className='lg:w-28 lg:h-20 w-20 h-16 rounded-r-full rounded-bl-full' src={item.image} alt="" />
                            <div>
                                <h2 className='lg:text-3xl text-xl '>{item.name}</h2>
                                <p className='text-sm lg:text-base'>{item.recipe}</p>
                            </div>
                            <p className='text-yellow-500 font-semibold'>Price: {item.price}</p>
                        </div>
                    )
                }

                {
                    showAllMenu && menu?.map(item =>
                        <div key={item._id} className='flex lg:space-x-4 space-x-1 lg:mx-16 mx-2'>
                            <img className='lg:w-28 lg:h-20 w-20 h-16 rounded-r-full rounded-bl-full' src={item.image} alt="" />
                            <div>
                                <h2 className='lg:text-3xl text-xl '>{item.name}</h2>
                                <p className='text-sm lg:text-base'>{item.recipe}</p>
                            </div>
                            <p className='text-yellow-500 font-semibold'>Price: {item.price}</p>
                        </div>
                    )
                }
            </div>
            <div className='flex justify-center '>
                {
                    loading && <p className="w-[400px] "><Lottie animationData={loadingAnimation} /></p>
                }
            </div>


            {isMenu ?
                <div className="text-center mt-16">
                    <Link to={`/order/${title}`} className=' text-black hover:text-white uppercase px-12 py-3 border-b-4 border-black hover:border-none  hover:bg-black transition-all duration-300 rounded-md active:scale-110'>Order your favorite food</Link>
                </div> :
                <div className="text-center mt-16">
                    {!showAllMenu ? <button onClick={toggleMenuVisibility} className=' text-black hover:text-white uppercase px-12 py-3 border-b-4 border-black hover:border-none  hover:bg-black transition-all duration-300 rounded-md active:scale-110'>Read more</button> :

                        <button onClick={() => toggleMenuVisibility(false)} className=' text-black hover:text-white uppercase px-12 py-3 border-b-4 border-black hover:border-none  hover:bg-black transition-all duration-300 rounded-md active:scale-110'>Show less</button>}
                </div>
            }
        </div>
    );
};

export default MenuItem;