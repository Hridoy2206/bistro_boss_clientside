
const SectionHeading = ({ heading, subheading }) => {
    return (
        <div className=' space-y-3 my-12 lg:w-3/12 w-8/12 text-center mx-auto '>
            <p className='text-[#e7b644] border-b-4 pb-2'>{subheading}</p>
            <h2 className='text-2xl uppercase font-semibold border-b-4 pb-2'>{heading}</h2>
        </div>
    );
};

export default SectionHeading;