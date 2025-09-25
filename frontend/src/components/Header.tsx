import React from 'react';
import { Search, Settings, Bell, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  showNewButton?: boolean;
  onNewClick?: (id:string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, showNewButton = false, onNewClick }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
            <span className="text-yellow-400">⭐</span>
            <span>(Prod) {title}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
            />
          </div>
          
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Settings size={20} />
          </button>
          
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Bell size={20} />
            </button>
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <User size={20} />
          </button>

          {showNewButton && (
            <button
              onClick={() => {
                if(onNewClick)
                  onNewClick("")
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              New
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;