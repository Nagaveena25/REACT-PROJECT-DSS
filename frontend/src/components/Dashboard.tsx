import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import { recentActivity } from '../data/mockData';
import { Clock, Play, Users, Plus } from 'lucide-react';
import axios from 'axios';

interface DashboardProps {
  stats: DashboardStats;
  onNewIncident: (id:string) => void;
}

interface Stats{
  _id: string
  count: number
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onNewIncident }) => {
  const [statsData, setStatsData] = useState<Stats[] | []>([]);

  useEffect(()=>{
    getStatsData();
  },[]);

  async function getStatsData() {
    try {
      const res = await axios.get('http://localhost:5000/api/form/stats')
      if(res?.data?.data)
        setStatsData(res.data.data)
    } catch (error) {
      setStatsData([])
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Homepage 1</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock size={16} />
                <span>On Hold:</span>
              </div>
              {/* <span className="">{stats.onHold}</span> */}
              <span className="font-bold text-blue-900">{statsData?.find(item => item._id === 'On Hold')?.count || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-700">
                <Play size={16} />
                <span>In Progress:</span>
              </div>
              {/* <span className="font-bold text-blue-900">{stats.inProgress}</span> */}
              <span className="font-bold text-blue-900">{statsData?.find(item => item._id === "In Progress")?.count || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-700">
                <Users size={16} />
                <span>Assigned:</span>
              </div>
              <span className="font-bold text-blue-900">{statsData?.find(item => item._id === "Assigned")?.count || 0}</span>
              {/* <span className="font-bold text-blue-900">{stats.assigned}</span> */}
            </div>
          </div>
        </div>
        

        {/* Recent Activity */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="text-green-700">
                {activity}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={()=>onNewIncident("")}
              className="w-full text-left px-4 py-2 bg-white border border-orange-200 rounded hover:bg-orange-100 transition-colors text-orange-700"
            >
              Create New Incident
            </button>
            <button className="w-full text-left px-4 py-2 bg-white border border-orange-200 rounded hover:bg-orange-100 transition-colors text-orange-700">
              View My Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Add New Content Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Content</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Plus className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600">Click to add new dashboard widgets or content</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;