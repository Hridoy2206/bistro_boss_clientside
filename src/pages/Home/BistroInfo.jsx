import bgImage from "../../assets/home/chef-service.jpg"
const BistoInfo = () => {
    return (
        <div className='mb-16 text-center'>
            <div
                className="w-full bg-cover lg:p-24 p-8 "
                style={{ backgroundImage: `url(${bgImage})` }} >
                <div className=" bg-white text-gray-800 lg:p-24 p-4 mx-auto text-center lg:space-y-3 space-y-1 hover:scale-105 transition-all duration-300">
                    <h2 className="lg:text-3xl text-2xl uppercase font-serif">Bistro Boss</h2>
                    <p className="lg:w-8/12 mx-auto lg:text-lg text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut earum, repellendus blanditiis nemo, vero velit possimus temporibus soluta ducimus aspernatur repudiandae fugit voluptates ratione molestias? Nobis nesciunt nam blanditiis.
                    </p>
                </div>
            </div>
            <button className="py-2 w-40 h-16 px-6 mb-4 mt-6 text-sky-700 shadow-lg before:block before:-left-1 before:-top-1 before:bg-sky-700 before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%]  before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:bg-sky-700 after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-white relative inline-block">Button</button>
        </div>
    );
};

export default BistoInfo;