
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  Database, 
  Box, 
  Home, 
  Store, 
  ShoppingCart, 
  Layers,
  MapPin,
  Anchor,
  Plane,
  Navigation
} from 'lucide-react';
import { WorkspaceRole, MenuItem, User, Notification, ActivityLog } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  username: 'Alex Rivera',
  email: 'alex.rivera@global-logistics.com',
  avatar: 'https://picsum.photos/seed/alex/200',
  defaultWorkspaceId: 'ws1',
  preferredLayout: 'topbar', // Default changed to topbar as requested
  workspaces: [
    { id: 'ws1', name: 'Global Import Ops', role: WorkspaceRole.BUYER, isDefault: true, companyName: 'Oceanic Retail Ltd' },
    { id: 'ws2', name: 'Factory Export Unit', role: WorkspaceRole.VENDOR, isDefault: false, companyName: 'Eastern Mfg Group' },
    { id: 'ws3', name: 'Liaison Forwarding', role: WorkspaceRole.FREIGHT_FORWARDER, isDefault: false, companyName: 'FastTrack Logistics' }
  ]
};

export const MENU_REGISTRY: MenuItem[] = [
  { id: 'm0', title: 'Home', icon: 'Home', mfeId: 'home', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] },
  { id: 'm1', title: 'System', icon: 'Settings', mfeId: 'system', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER], children: [
      { id: 'm1-1', title: 'Role Management', icon: 'Users', mfeId: 'system.role', isOnline: false, statusLabel: '不可用', roles: [WorkspaceRole.BUYER] },
      { id: 'm1-2', title: 'User Settings', icon: 'Settings', mfeId: 'system.settings', isOnline: true, roles: [WorkspaceRole.BUYER] }
  ]},
  { 
    id: 'm4', 
    title: 'Store', 
    icon: 'Store', 
    mfeId: 'store', 
    isOnline: false, 
    statusLabel: '离线', 
    roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR],
    children: [
      { 
        id: 'm4-1', 
        title: 'Products', 
        icon: 'Package', 
        mfeId: 'store-product', 
        isOnline: false, 
        roles: [WorkspaceRole.BUYER],
        children: [
            { id: 'm4-1-1', title: 'Catalog', icon: 'Layers', mfeId: 'store-catalog', isOnline: false, roles: [WorkspaceRole.BUYER] },
            { id: 'm4-1-2', title: 'Pricing', icon: 'FileText', mfeId: 'store-pricing', isOnline: false, roles: [WorkspaceRole.BUYER] }
        ]
      },
      { id: 'm4-2', title: 'Inventory', icon: 'Box', mfeId: 'store-inventory', isOnline: false, roles: [WorkspaceRole.BUYER] }
    ]
  },
  { 
    id: 'm3', 
    title: 'Tracking', 
    icon: 'Truck', 
    mfeId: 'tracking', 
    isOnline: true, 
    roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER],
    children: [
      {
        id: 'm3-1',
        title: 'Ocean Freight',
        icon: 'Globe',
        mfeId: 'tracking-ocean',
        isOnline: true,
        roles: [WorkspaceRole.BUYER, WorkspaceRole.FREIGHT_FORWARDER],
        children: [
          { id: 'm3-1-1', title: 'Vessel Live Map', icon: 'Layers', mfeId: 'tracking-vessel', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-1-2', title: 'Container Status', icon: 'Box', mfeId: 'tracking-container', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-1-3', title: 'Port Congestion', icon: 'BarChart3', mfeId: 'tracking-port', isOnline: false, statusLabel: '离线', roles: [WorkspaceRole.BUYER] }
        ]
      },
      {
        id: 'm3-2',
        title: 'Air Cargo',
        icon: 'Layers',
        mfeId: 'tracking-air',
        isOnline: true,
        roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR],
        children: [
          { id: 'm3-2-1', title: 'Flight Schedules', icon: 'FileText', mfeId: 'tracking-flight', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-2-2', title: 'AWB Tracking', icon: 'Database', mfeId: 'tracking-awb', isOnline: true, roles: [WorkspaceRole.BUYER] }
        ]
      },
      {
        id: 'm3-3',
        title: 'Land Logistics',
        icon: 'Truck',
        mfeId: 'tracking-land',
        isOnline: false,
        statusLabel: '不可用',
        roles: [WorkspaceRole.BUYER, WorkspaceRole.FREIGHT_FORWARDER],
        children: [
          { id: 'm3-3-1', title: 'Truck Dispatch', icon: 'Users', mfeId: 'tracking-truck', isOnline: false, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-3-2', title: 'Route Optimization', icon: 'MapPin', mfeId: 'tracking-route', isOnline: false, roles: [WorkspaceRole.BUYER] }
        ]
      }
    ]
  },
  { id: 'm7', title: 'Reporting', icon: 'BarChart3', mfeId: 'reporting', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Order #SC-9821 Shipped', content: 'Departure from Origin Port.', type: 'SUCCESS', read: false, timestamp: '2023-11-20T10:00:00Z' }
];

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: 'a1', type: 'LOGIN', timestamp: '2023-11-20T08:00:00Z', details: 'Logged in from IP 192.168.1.1' },
];

export const getIcon = (name: string, className = "w-4 h-4") => {
  const icons: Record<string, any> = {
    LayoutDashboard, Package, Truck, FileText, Users, Settings, BarChart3, Globe, ShieldCheck, Database, Box, Home, Store, ShoppingCart, Layers, MapPin, Anchor, Plane, Navigation
  };
  const IconComp = icons[name] || LayoutDashboard;
  return <IconComp className={className} />;
};
