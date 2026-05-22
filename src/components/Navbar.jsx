'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '../lib/auth-client';

const Navbar = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const syncToken = async () => {
            if (!session?.user) return;
            const { data: token } = await authClient.getToken();
            if (token) localStorage.setItem("token", token);
        };
        syncToken();
    }, [session]);

    const handleLogout = async () => {
        await authClient.signOut();
        localStorage.removeItem("token");
        router.push("/login");
    };

    return ( 
        <div className='bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100'>
            <div className="navbar mx-auto container px-4 sm:px-4 lg:px-2 h-16">

                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-gray-50 gap-2">
                            <li><Link href="/" className="font-medium py-2">Home</Link></li>
                            <li><Link href="/all-facilities" className="font-medium py-2">All Facilities</Link></li>
                            {user ? (
                                <>
                                    <li><Link href="/my-bookings" className="font-medium py-2">My Bookings</Link></li>
                                    <li><Link href="/manage-my-facilities" className="font-medium py-2">Manage my facilities</Link></li>
                                    <li><Link href="/add-facility" className="font-medium py-2">Add New Facilities</Link></li>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <li><button onClick={handleLogout} className="font-medium py-2 text-red-600">Logout</button></li>
                                </>
                            ) : (
                                <li><Link href="/login" className="font-medium py-2 text-green-600">Login</Link></li>
                            )}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center">
                        <Image className="object-contain" src={logo} width={140} height={45} alt='SportNest Logo' priority />
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8 text-[15px] font-semibold text-gray-700">
                        <li><Link href="/" className="font-medium py-2">Home</Link></li>
                        <li><Link href="/all-facilities" className="font-medium py-2">All Facilities</Link></li>
                    </ul>
                </div>

                <div className="navbar-end">
                    {!user ? (
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full shadow-md shadow-green-600/10 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring-2 ring-green-600 ring-offset-2">
                                    {user.image ? (
                                        <Image width={40} height={40} src={user.image} alt={user.name} className="rounded-full" />
                                    ) : (
                                        <div className="bg-green-600 text-white flex items-center justify-center w-full h-full text-lg font-bold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-gray-50 gap-1">
                                <li><Link href="/my-bookings" className="font-medium py-2">My Bookings</Link></li>
                                <li><Link href="/manage-my-facilities" className="font-medium py-2">Manage my facilities</Link></li>
                                <li><Link href="/add-facility" className="font-medium py-2">Add New Facilities</Link></li>
                                <div className="border-t border-gray-100 my-1"></div>
                                <li><button onClick={handleLogout} className="font-medium py-2 text-red-600">Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    ); 
};

export default Navbar;