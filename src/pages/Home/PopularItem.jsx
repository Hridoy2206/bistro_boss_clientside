import React, { useEffect, useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import Item from '../../shared/MenuItem';
import useMenu from '../../hooks/useMenu';
import MenuItem from '../../shared/MenuItem';

const PopularItem = () => {
    const [menu, loading, refetch] = useMenu();
    const popular = menu.filter(item => item?.category === "popular");

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <SectionHeading subheading={"Check it out"} heading={"from our menu"} />
            <MenuItem items={popular} />
        </div>
    );
};

export default PopularItem;