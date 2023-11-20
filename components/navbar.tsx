import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


const NavBar: React.FC = () => {
  return (
    <div className = "flex w-full">
    <div className="flex w-full flex-row items-center justify-center h-16 bg-gray-200 px-20">
      <div className="mr-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Feed</button>
      </div>
      <div className="ml-2">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Profile</button>
      </div>
    </div>
    </div>
  );
};

export default NavBar;