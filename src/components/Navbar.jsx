import Image from 'next/image';
import logo from '../../public/assets/logo.jpg'
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className=' bg-base-100 shadow'>
            <div className="navbar mx-auto container ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <Link href={'/'}><li>Home</li></Link>
                            <Link href={'/all-facilities'}><li>All Facilities</li></Link>
                            <Link href={'/my-bookings'}><li>My Bookings</li></Link>
                            <Link href={'/add-facility'}><li>Add Facility</li></Link>
                            <Link href={'/manage-my-facilities'}><li>Manage My Facilities</li></Link>

                        </ul>
                    </div>
                    <Image src={logo} width={120} height={60} alt=''></Image>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-5">
                        <Link href={'/'}><li>Home</li></Link>
                            <Link href={'/all-facilities'}><li>All Facilities</li></Link>
                            <Link href={'/my-bookings'}><li>My Bookings</li></Link>
                            <Link href={'/add-facility'}><li>Add Facility</li></Link>
                            <Link href={'/manage-my-facilities'}><li>Manage My Facilities</li></Link>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;