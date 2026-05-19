import React from 'react';

const Loading = () => {
    return (
        <div className="min-h-screen bg-[#efffea] flex flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center gap-4">
                
                <span className="loading loading-spinner w-16 h-16 text-green-600 animate-spin"></span>
                
              
                <div className="text-center mt-2">
                    <h2 className="text-xl font-bold text-gray-800 tracking-wide">
                        Loading SportNest
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 animate-pulse">
                        Fetching the best sports facilities for you...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;