import React, { useEffect, useState } from 'react';
import { Incident } from '../types';
import { Filter, ChevronLeft, ChevronRight, Ticket, SquarePen } from 'lucide-react';
import axios from 'axios';

interface IncidentListProps {
  incidents: Incident[];
  title: string;
  emptyState?: boolean;
  onNewClick?: (id:string) => void;
}

interface incidentData{
additionalComments: string;
alternativeContact: string;
assignedTo: string;
assignedToCount: string;
assignmentGroup: string;
caller: string;
category: string;
channel: string;
configurationItem: string;
description: string;
impact: string;
kbaUsed: string;
location: string;
number: string;
openedby: string;
parent: string;
priority: string;
reOpenCount: string;
reassignmentCount: string;
shortDescription: string;
state: string;
subcategory: string;
urgency: string;
workNotes: string;
__v: number;
_id: string;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, title, emptyState = false, onNewClick }) => {
  
  const [data, setData] = useState<incidentData[] | []>([]);

  // console.log("Title", title)
  
  useEffect(()=>{
    onHoldData();
  },[title]);

  async function onHoldData() {
    try {
      const res = await axios.post('http://localhost:5000/api/form/', {title: title})
      if(res?.data?.data?.length === 0){
        setData([]);
        emptyState = true;
      }else{
        setData(res.data.data);
      }
    } catch (error) {
      emptyState = true;
      setData([]);
    }
  }

  if (data.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={16} />
              Filter
            </button>
            <span className="text-sm text-gray-600">
              All  Assignment group = (TRS, 3D-Drive/WRS Support)  Active = true  Incident state = {title}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-48 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mx-auto mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 right-4 w-6 h-6 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-6 right-12 w-4 h-4 bg-orange-500 rounded-full"></div>
              <div className="absolute top-6 left-6 w-3 h-3 bg-pink-400 rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-white rounded-full"></div>
            </div>
            <h3 className="text-xl font-medium text-gray-600">No records to display</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={16} />
            Filter
          </button>
          <span className="text-sm text-gray-600">
            All  Assignment group = (TRS, 3D-Drive/WRS Support)  Active = true  Incident state = {title}
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="text-left p-4 font-medium text-gray-900">Number</th>
              <th className="text-left p-4 font-medium text-gray-900">Opened by</th>
              <th className="text-left p-4 font-medium text-gray-900">assignedTo</th>
              <th className="text-left p-4 font-medium text-gray-900">Short description</th>
              <th className="text-left p-4 font-medium text-gray-900">Caller</th>
              <th className="text-left p-4 font-medium text-gray-900">Category</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {incidents.map((incident) => (
              <tr key={incident.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-medium">{incident.number}</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">false</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600">-</td>
                <td className="p-4 text-gray-600 text-sm">
                  {new Date(incident.opened).toLocaleDateString('en-GB')} {new Date(incident.opened).toLocaleTimeString('en-GB', { hour12: false })}
                </td>
                <td className="p-4 text-gray-900">{incident.shortDescription}</td>
                <td className="p-4">
                  <span className="text-blue-600">{incident.caller}</span>
                </td>
                <td className="p-4 text-gray-600">{incident.department}</td>
                <td className="p-4 text-gray-600">{incident.location}</td>
              </tr>
            ))} */}
            {data?.map((incident : incidentData) => (
              <tr key={incident._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-medium">{incident.number}</span>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">false</span>
                  </div>
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  {incident.openedby}
                  {/* {new Date(incident.opened).toLocaleDateString('en-GB')} {new Date(incident.opened).toLocaleTimeString('en-GB', { hour12: false })} */}
                </td>
                <td className="p-4 text-gray-600">{incident.assignedTo}</td>
                <td className="p-4 text-gray-900">{incident.shortDescription}</td>
                <td className="p-4">
                  <span className="text-blue-600">{incident.caller}</span>
                </td>
                <td className="p-4 text-gray-600">{incident.category}</td>
                <td className="p-4 text-gray-600" ><SquarePen onClick={()=>{
                  // console.log("ID", incident._id)
                  // localStorage.setItem("ID", incident._id);
                  // onNewClick
                  if (onNewClick) {
                    onNewClick(incident._id); // Calling the function
                  } 
                  }}  /></td>
                {/* <td className="p-4 text-gray-600">{incident.location}</td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <ChevronLeft size={16} />
            </button>
            <div className="w-64 h-2 bg-gray-200 rounded-full">
              <div className="w-full h-full bg-gray-400 rounded-full"></div>
            </div>
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">1 to 7 of 7</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">−</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">⌐</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default IncidentList;