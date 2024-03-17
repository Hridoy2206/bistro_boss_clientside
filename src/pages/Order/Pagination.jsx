const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage }) => {
    const pageNumbers = Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1);

    return (
        <nav>
            <p className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => setCurrentPage(number)}
                            href="#"
                            className={currentPage === number ? 'active' : ''}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </p>
        </nav>
    );
};

export default Pagination;