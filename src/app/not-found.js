import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
       
            <div className="relative animate-bounce">
                <h1 className="text-9xl font-black text-green-600 opacity-20 select-none">
                    404
                </h1>
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl font-extrabold text-gray-800">
                    Oops!
                </p>
            </div>

            
            <div className="mt-6 max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    Page Not Found
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Looks like you took a wrong turn or the sports facility page you are looking for has been moved or canceled. Let's get you back on track!
                </p>
            </div>

           
            <div className="mt-8">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-5 height-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;