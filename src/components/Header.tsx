import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={openSidebar}
          className="text-gray-400 hover:text-white md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="ml-4 md:ml-0 relative rounded-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full bg-gray-700 border-gray-600 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center">
          <div className="ml-3 relative group">
            <div className="flex items-center space-x-3">
              <div className="text-sm text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-xs">Artist</p>
              </div>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar || "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt="User avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;