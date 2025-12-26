
export enum WorkspaceRole {
  BUYER = 'BUYER',
  VENDOR = 'VENDOR',
  FREIGHT_FORWARDER = 'FORWARDER',
  CUSTOMS_BROKER = 'BROKER',
  WAREHOUSE = 'WAREHOUSE'
}

export type LayoutType = 'sidebar' | 'topbar';
export type Language = 'en' | 'zh';

export interface Workspace {
  id: string;
  name: string;
  role: WorkspaceRole;
  isDefault: boolean;
  companyName: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  workspaces: Workspace[];
  defaultWorkspaceId: string;
  preferredLayout: LayoutType;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  mfeId: string;
  isOnline: boolean;
  roles: WorkspaceRole[];
  statusLabel?: string;
  children?: MenuItem[]; // Recursive children for multi-level menus
}

export interface ActivityLog {
  id: string;
  type: 'LOGIN' | 'WORKSPACE_SWITCH' | 'PASSWORD_CHANGE';
  timestamp: string;
  details: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  timestamp: string;
}
