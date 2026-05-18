import React from 'react';
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className='bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100'>
            <div className="navbar mx-auto container px-4 sm:px-6 lg:px-8 h-20">
                
           
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-gray-50 gap-2">
                            <li><Link href="/" className="font-medium py-2">Home</Link></li>
                            <li><Link href="/all-facilities" className="font-medium py-2">All Facilities</Link></li>
                        </ul>
                    </div>
                    
                  
                    <Link href="/" className="flex items-center">
                        <Image 
                            className="object-contain" 
                            src={logo} 
                            width={140} 
                            height={45} 
                            alt='SportNest Logo'
                            priority
                        />
                    </Link>
                </div>

                
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8 text-[15px] font-semibold text-gray-700">
                        <li>
                            <Link href="/" className="hover:text-green-600 transition-colors focus:bg-transparent active:bg-transparent p-2">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/all-facilities" className="hover:text-green-600 transition-colors focus:bg-transparent active:bg-transparent p-2">
                                All Facilities
                            </Link>
                        </li>
                    </ul>
                </div>

            
                <div className="navbar-end">
                    <Link 
                        href="/login" 
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-green-600/10 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Login
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={2.5} 
                            stroke="currentColor" 
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Navbar;