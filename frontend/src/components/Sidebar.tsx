import React from 'react';
import { Home, Clock, Play, Users, TicketCheck, CheckCircle  } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'home' as ViewType, label: 'Home', icon: Home },
    { id: 'onhold' as ViewType, label: 'OnHold', icon: Clock },
    { id: 'inprogress' as ViewType, label: 'InProgress', icon: Play },
    { id: 'assigned' as ViewType, label: 'Assigned', icon: Users },
    { id: 'resolved' as ViewType, label: 'Resolved', icon: CheckCircle  }
  ];

  return (
    <div className="w-72 bg-slate-800 text-white min-h-screen">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
            Devahuthi
          </div>
          <span className="text-gray-300">Incident Management</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-slate-700 text-white border-l-4 border-orange-500' 
                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-12">
          <h3 className="text-gray-400 text-sm font-medium mb-3">ADDITIONAL</h3>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors">
            <TicketCheck size={20} />
            <span>TRS Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;