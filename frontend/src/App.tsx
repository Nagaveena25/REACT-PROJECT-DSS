import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IncidentList from './components/IncidentList';
import NewIncidentModal from './components/NewIncidentModal';
import { ViewType, Incident } from './types';
import { dashboardStats, incidents as mockIncidents } from './data/mockData';

function App() {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);

  const handleNewIncident = () => {
    setIsModalOpen(true);
  };

  const handleSubmitIncident = (newIncident: Partial<Incident>) => {
    const incident: Incident = {
      id: Date.now().toString(),
      number: newIncident.number || 'INC0001',
      status: newIncident.status || 'New',
      priority: newIncident.priority || 'Low',
      shortDescription: newIncident.shortDescription || '',
      description: newIncident.description || '',
      caller: newIncident.caller || '',
      department: 'Engineering',
      location: newIncident.location || '',
      opened: newIncident.opened || new Date().toISOString(),
      impact: newIncident.impact || 'Low',
      urgency: 'Low'
    };
    
    setIncidents(prev => [...prev, incident]);
  };

  const getHeaderTitle = () => {
    switch (activeView) {
      case 'home':
        return 'My Homepage 1';
      case 'onhold':
        return 'Incidents - On Hold';
      case 'inprogress':
        return 'Incidents - In Progress';
      case 'assigned':
        return 'Incidents - Assigned';
      default:
        return 'My Homepage 1';
    }
  };

  const getFilteredIncidents = () => {
    switch (activeView) {
      case 'onhold':
        return incidents.filter(incident => incident.status === 'On Hold');
      case 'inprogress':
        return incidents.filter(incident => incident.status === 'In Progress');
      case 'assigned':
        return incidents.filter(incident => incident.status === 'Assigned');
      default:
        return [];
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <Dashboard stats={dashboardStats} onNewIncident={handleNewIncident} />;
      case 'onhold':
        return (
          <IncidentList 
            incidents={getFilteredIncidents()} 
            title="On Hold Incidents" 
          />
        );
      case 'inprogress':
        return (
          <IncidentList 
            incidents={getFilteredIncidents()} 
            title="In Progress Incidents" 
            emptyState={true}
          />
        );
      case 'assigned':
        return (
          <IncidentList 
            incidents={getFilteredIncidents()} 
            title="Assigned Incidents"
            emptyState={true}
          />
        );
      default:
        return <Dashboard stats={dashboardStats} onNewIncident={handleNewIncident} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          title={getHeaderTitle()} 
          showNewButton={activeView !== 'home'} 
          onNewClick={handleNewIncident}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      <NewIncidentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitIncident}
      />
    </div>
  );
}

export default App;