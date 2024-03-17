import coverImg from "../../assets/shop/banner2.jpg"
import { useState } from 'react';
import CoverBanner from '../../shared/CoverBanner';
import useMenu from "../../hooks/useMenu";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import loadingAnimation from "../../loadingAnimation.json"
import Lottie from "lottie-react";

const Order = () => {
    const { category } = useParams();
    console.log(category);
    const [menu, loading] = useMenu();
    const pizzaMenu = menu.filter(item => item.category === "pizza");
    const saladMenu = menu.filter(item => item.category === "salad");
    const soupMenu = menu.filter(item => item.category === "soup");
    const dessertMenu = menu.filter(item => item.category === "dessert");
    const drinksMenu = menu.filter(item => item.category === "drinks");

    const [activeTab, setActiveTab] = useState(category);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderContent = {
        pizza: <OrderTab items={pizzaMenu} />,
        salad: <OrderTab items={saladMenu} />,
        soup: <OrderTab items={soupMenu} />,
        dessert: <OrderTab items={dessertMenu} />,
        drinks: <OrderTab items={drinksMenu} />,
    }

    const tabs = ['pizza', 'salad', 'soup', 'dessert', 'drinks'];

    return (
        <div>
            <CoverBanner bgImage={coverImg} title={'Our shop'} />

            <div className="flex my-16 lg:gap-10 gap-3 text-sm lg:text-xl justify-center">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        onClick={() => handleTabClick(tab)}
                        className={`cursor-pointer capitalize font-semibold ${activeTab === tab ? 'text-orange-400 underline underline-offset-8' : ' text-gray-700'}`}
                    >{tab}</div>
                ))}
            </div>

            <div className="lg:mx-10">{renderContent[activeTab] || null}</div>

            {
                loading && <p className="flex justify-center"><Lottie animationData={loadingAnimation} /></p>
            }
        </div>
    );
};

export default Order;












