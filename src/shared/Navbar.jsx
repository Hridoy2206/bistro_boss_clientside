import { Link, NavLink } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { useContext } from "react";
import { AuthContaxt } from "../provider/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../hooks/useCart";
import { StateContext } from "../provider/GlobalStateManagment";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
    const { navbarToggle, setNavbarToggle, } = useContext(StateContext);
    const { user, logout } = useContext(AuthContaxt);
    const [isAdmin] = useAdmin();
    const [cartData] = useCart();

    const handleToggle = () => {
        setNavbarToggle(pre => !pre)
    }

    const handleSignOut = () => {
        logout()
    }

    const menuList = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        {/* <li><NavLink to={"/contact-us"}>Contact Us</NavLink></li> */}
        {user && <li><NavLink to={`${isAdmin ? "/dashboard/admin/home" : "/dashboard/home"}`}>Dashboard</NavLink></li>}
        <li><NavLink to={"/our-menu"}>Our menu</NavLink></li>
        <li><NavLink to={"/order/pizza"}>Order</NavLink></li>
        {user && !isAdmin && <li className="bg-green-500 rounded-3xl p-2">
            <Link to={"/dashboard/my-cart"} className="flex gap-2 ">
                <span className="text-2xl"><FaCartPlus /></span>
                <span className="rounded-xl px-2 bg-red-400">+{user ? <>{cartData.length}</> : 0}</span>
            </Link>
        </li>}
        {/* <li><NavLink to={"/secret"}>Secret</NavLink></li> */}
        {
            user ? <li><button onClick={handleSignOut}>Logout</button></li> : <><li><NavLink to={"/login"}>Login</NavLink></li></>
        }
    </>
    return (
        <section className="flex justify-between items-center fixed z-10 w-full  lg:px-14 px-3 py-4 bg-gray-900 bg-opacity-30 text-[#ffffff]">
            <div >
                <Link to={"/"}>
                    <div className="lg:text-3xl text-2xl font-serif uppercase ">
                        <h2>BISTRO BOSS</h2>
                        <h4 className="lg:text-2xl text-xl tracking-[.25em]">Resturant</h4>
                    </div>
                </Link>
            </div>

            {/*// Desktop version*/}
            <div className=" hidden lg:block">
                <ul className="text-base font-semibold flex gap-10">
                    {menuList}
                </ul>
            </div>



            {/*// Mobile version*/}
            <div className=" block lg:hidden">
                <div className="text-3xl block lg:hidden" onClick={handleToggle}>
                    <RiMenu3Fill />
                </div>
                <ul className={`text-base font-semibold absolute ${!navbarToggle ? "right-[-250px] mt-6" : "right-0 mt-6"} duration-500 space-y-3 bg-white text-black px-14 py-6 rounded-md text-center`}>
                    {menuList}
                </ul>
            </div>
        </section>
    );
};

export default Navbar;