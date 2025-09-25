export interface Incident {
  id: string;
  number: string;
  status: 'New' | 'On Hold' | 'In Progress' | 'Assigned' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  shortDescription: string;
  description: string;
  caller: string;
  department: string;
  location: string;
  opened: string;
  category?: string;
  subcategory?: string;
  assignmentGroup?: string;
  assignedTo?: string;
  channel?: string;
  impact: 'Low' | 'Medium' | 'High';
  urgency: 'Low' | 'Medium' | 'High';
}

export interface DashboardStats {
  onHold: number;
  inProgress: number;
  assigned: number;
}

export type ViewType = 'home' | 'onhold' | 'inprogress' | 'assigned';