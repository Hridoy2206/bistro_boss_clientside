import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import bannerImg from "../../assets/menu/banner3.jpg"
import Cover from '../../shared/Cover';
import dessertImg from "../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../assets/menu/pizza-bg.jpg"
import saladImg from "../../assets/menu/salad-bg.jpg"
import soupImg from "../../assets/menu/soup-bg.jpg"
import drinksImg from "../../assets/menu/banner3.jpg"
import SectionHeading from '../../components/SectionHeading';
import CoverBanner from '../../shared/CoverBanner';
import useMenu from '../../hooks/useMenu';
import MenuItem from '../../shared/MenuItem';

const Menu = () => {
    const [menu, loading] = useMenu();
    const dessert = menu.filter(item => item.category === "dessert");
    const pizza = menu.filter(item => item.category === "pizza");
    const salad = menu.filter(item => item.category === "salad");
    const soup = menu.filter(item => item.category === "soup");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div >
            {/* Set document title using Helmet for SEO purposes */}
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>

            {/* Display a banner with a background image and a title */}
            <CoverBanner bgImage={bannerImg} title="our menu" />

            {/* Section for today's special offer */}
            <SectionHeading subheading="-- Don't Miss --" heading="Today's Offer" />

            {/* Display Dessert category with a cover image */}
            <Cover coverImg={dessertImg} title={"Dessert"} />
            {/* Display MenuCategory component for Dessert items */}
            <MenuItem items={dessert} title={"dessert"} />

            {/* Display Soup category with a cover image */}
            <Cover coverImg={pizzaImg} title={"Pizza"} />
            {/* Display Pizza category with a cover image */}
            <MenuItem items={pizza} title={"pizza"} />

            {/* Display Soup category with a cover image */}
            <Cover coverImg={saladImg} title={"Salad"} />
            {/* Display MenuCategory component for Popular Pizza items */}
            <MenuItem items={salad} title={"salad"} />

            {/* Display Soup category with a cover image */}
            <Cover coverImg={soupImg} title={"Soup"} />
            {/* Display Salad category with a cover image */}
            <MenuItem items={soup} title={"soup"} />

            {/* Display Soup category with a cover image */}
            <Cover coverImg={drinksImg} title={"Drinks"} />
            {/* Display MenuCategory component for Salad items */}
            <MenuItem items={drinks} title={"drinks"} />

        </div>
    );
};

export default Menu;