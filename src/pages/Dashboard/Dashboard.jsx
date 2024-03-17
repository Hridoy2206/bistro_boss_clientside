import { BsCalendar3 } from 'react-icons/bs';
import { FaCalendarDay, FaHome, FaShoppingBag, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Drower from '../../components/Drower';
import { AiOutlineMenu, AiTwotoneHome } from 'react-icons/ai';
import { BiSolidBookAlt } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';

const Dashboard = () => {

    //* =========User Sidebar menu =============*\\
    const userMenuList = <>
        <li ><NavLink to="/dashboard/home" className="flex gap-3 items-center"><AiTwotoneHome /> User Home</NavLink></li>
        <li><NavLink to="/dashboard/payment" className="flex gap-3 items-center"><FaCalendarDay /> Reservation</NavLink></li>
        <li><NavLink to="/dashboard/payment-history" className="flex gap-3 items-center"><FaWallet /> Payment History</NavLink></li>
        <li><NavLink to="/dashboard/my-cart" className="flex gap-3 items-center"><FaShoppingCart /> My Cart</NavLink></li>
        <li><NavLink to="/dashboard/review" className="flex gap-3 items-center"><FaWallet /> Add Review</NavLink></li>
        <li><NavLink to="/dashboard/bookings" className="flex gap-3 items-center"><BsCalendar3 /> My Bookings</NavLink></li>
    </>

    //* =========Common Sidebar menu =============*\\
    const homeList = <>
        <li><NavLink to="/" className="flex gap-3 items-center"><AiTwotoneHome /> Home</NavLink></li>
        <li><NavLink to="/menu" className="flex gap-3 items-center"><AiOutlineMenu />Menu</NavLink></li>
        <li><NavLink to="/order/salad" className="flex gap-3 items-center"><FaShoppingBag /> Shop</NavLink></li>
    </>

    //* =========Admin Sidebar menu =============*\\
    const adminMenuList = <>
        <li><NavLink to='/dashboard/admin/home' className="flex gap-3 items-center"><FaHome />Admin Home</NavLink></li>
        <li><NavLink to='/dashboard/admin/ad-item' className="flex gap-3 items-center"><FaUtensils />Ad Item</NavLink></li>
        <li><NavLink to='/dashboard/admin/manage-item' className="flex gap-3 items-center"><TfiMenuAlt />Manage Item</NavLink></li>
        <li><NavLink to='/dashboard/admin/manage-bookings' className="flex gap-3 items-center"><BiSolidBookAlt />Manage Bookings</NavLink></li>
        <li><NavLink to='/dashboard/admin/all-user' className="flex gap-3 items-center"><FaUsers /> All Users</NavLink></li>
    </>
    return (
        <div>
            <Drower userMenuList={userMenuList} homeList={homeList} adminMenuList={adminMenuList} />
        </div>
    );
};

export default Dashboard;