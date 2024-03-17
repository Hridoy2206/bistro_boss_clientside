import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { StateContext } from "../provider/GlobalStateManagment";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import useAdmin from "../hooks/useAdmin";

const Drower = ({ userMenuList, homeList, adminMenuList }) => {
    const { sidebarToggle, setSidebarToggle } = useContext(StateContext);

    const [isAdmin, adminLoading] = useAdmin();

    const handleToogleSidebar = () => {
        setSidebarToggle(false);
    }
    if (adminLoading) {
        return <p>loading...</p>
    }
    return (
        <>
            <div onClick={() => setSidebarToggle(true)} className={` ${sidebarToggle ? " hidden" : "block"} text-4xl absolute right-3 top-3 lg:hidden`}>
                <MdOutlineDashboard />
            </div>
            <div className="flex">
                <div>
                    {/*//* Desktop Version */}
                    <ul className="lg:block hidden lg:space-y-6 space-y-5  min-h-screen menu p-6 w-72 h-full bg-[#D1A054] text-base-content uppercase font-semibold">
                        {/*----Logo Field----*/}
                        <Link to='/' className='ml-4 mb-12'>
                            <h2 className="text-2xl uppercase font-serif font-bold tracking-[.10em]">Bistro Boss</h2>
                            <p className="uppercase font-serif tracking-[.85em]">Rasturant</p>
                        </Link>

                        {
                            isAdmin ? <>{adminMenuList}</> : <>{userMenuList}</>
                        }

                        <hr />
                        {homeList}
                    </ul>

                    {/*//* Mobile Version */}
                    <ul onClick={() => setSidebarToggle(false)} className={`z-40 space-y-4 block lg:hidden fixed h-full bg-[#D1A054]  p-5 shadow-lg origin-left top-0 rounded-md ${!sidebarToggle ? 'scale-x-0' : 'scale-x-100 w-72'} duration-300 rounded-md`}>

                        {sidebarToggle && <div
                            onClick={() => setSidebarToggle(pre => !pre)}
                            className="text-4xl cursor-pointer block lg:hidden top-4 right-4 z-50 fixed ">
                            <IoIosCloseCircle />
                        </div>}
                        {/*----Logo Field----*/}
                        <Link to='/' className='ml-4 mb-12'>
                            <h2 className="text-2xl uppercase font-serif font-bold tracking-[.10em]">Bistro Boss</h2>
                            <p className="uppercase font-serif tracking-[.85em]">Rasturant</p>
                        </Link>
                        {userMenuList}
                        <hr />
                        {homeList}
                    </ul>
                </div>
                <div onClick={handleToogleSidebar} className={` flex-1 bg-[#F6F6F6] overflow-x-hidden lg:p-12 p-4 mt-16 lg:mt-0 ${sidebarToggle && "blur-sm"}`}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Drower;