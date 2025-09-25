import { Incident, DashboardStats } from '../types';

export const dashboardStats: DashboardStats = {
  onHold: 2,
  inProgress: 0,
  assigned: 0,
};

export const incidents: Incident[] = [
  {
    id: '1',
    number: 'INC0123',
    status: 'On Hold',
    priority: 'Low',
    shortDescription: 'has got stuck in WRS.',
    description: 'User reported an issue with WRS system functionality',
    caller: 'Frantisek Pisk',
    department: 'Engineering',
    location: 'CZ45',
    opened: '2025-09-10 02:27:20',
    category: 'Hardware',
    impact: 'Low',
    urgency: 'Low'
  },
  {
    id: '2',
    number: 'INC4567',
    status: 'On Hold',
    priority: 'Low',
    shortDescription: 'I have again issue with uploading data ...',
    description: 'Data upload functionality is not working properly',
    caller: 'Lubos Pecka',
    department: 'Engineering',
    location: 'CZ46',
    opened: '2025-09-10 03:14:36',
    category: 'Software',
    impact: 'Low',
    urgency: 'Low'
  }
];

export const recentActivity = [
  '3 incidents resolved today',
  '5 new assignments',
  '2 escalations handled'
];