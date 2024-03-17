// import React from 'react';
// import FoodCard from './FoodCard';

// const OrderTab = ({ items }) => {
//     return (
//         <div className="grid lg:grid-cols-4 lg:mx-24 gap-12">
//             {
//                 items.map(item => <FoodCard key={item._id} items={item} />)
//             }
//         </div>
//     );
// };

// export default OrderTab;

import React, { useState, useEffect } from 'react';
import FoodCard from './FoodCard';

const OrderTab = ({ items }) => {
    const itemsPerPage = 4;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const [showPagination, setShowPagination] = useState(false);

    useEffect(() => {
        setShowPagination(totalPages > 1);
    }, [totalPages]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, items?.length);

    return (
        <div>
            <div className="grid lg:grid-cols-4 lg:mx-24 gap-12">
                {items.slice(startIndex, endIndex).map((item) => (
                    <FoodCard key={item._id} items={item} />
                ))}
            </div>

            {showPagination && (
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePaginationClick(index + 1)}
                            className={`mx-2 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#0095FF] hover:bg-[#0095FF]/80 duration-300 text-white' : 'bg-gray-300 text-gray-700'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderTab;
