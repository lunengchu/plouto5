
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
  Navigation,
  Compass,
  FilePlus,
  Play,
  CloudOff,
  TrendingUp,
  Clock
} from 'lucide-react';
import { WorkspaceRole, MenuItem, User, Notification, ActivityLog } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  username: 'Alex Rivera',
  email: 'alex.rivera@global-logistics.com',
  avatar: 'https://picsum.photos/seed/alex/200',
  defaultWorkspaceId: 'ws1',
  preferredLayout: 'topbar',
  workspaces: [
    { id: 'ws1', name: 'Global Import Ops', role: WorkspaceRole.BUYER, isDefault: true, companyName: 'Oceanic Retail Ltd' },
    { id: 'ws2', name: 'Factory Export Unit', role: WorkspaceRole.VENDOR, isDefault: false, companyName: 'Eastern Mfg Group' },
    { id: 'ws3', name: 'Liaison Forwarding', role: WorkspaceRole.FREIGHT_FORWARDER, isDefault: false, companyName: 'FastTrack Logistics' }
  ]
};

export const MENU_REGISTRY: MenuItem[] = [
  { id: 'm0', title: 'Home', icon: 'Home', mfeId: 'home', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] },
  { 
    id: 'm8', 
    title: 'Demo Center', 
    icon: 'Play', 
    mfeId: 'demo', 
    isOnline: true, 
    roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER],
    children: [
      { id: 'demo-order', title: 'Create Order Demo', icon: 'FilePlus', mfeId: 'demo.order', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR] },
      { id: 'demo-404', title: '404 Page Showcase', icon: 'Compass', mfeId: 'demo.404', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] }
    ]
  },
  { 
    id: 'm3', 
    title: 'Logistics Tracking', 
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
          { id: 'm3-1-1', title: 'Vessel Live Map', icon: 'MapPin', mfeId: 'tracking-vessel', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-1-2', title: 'Container Status', icon: 'Box', mfeId: 'tracking-container', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-1-3', title: 'Port Congestion Index', icon: 'BarChart3', mfeId: 'tracking-port', isOnline: false, statusLabel: 'OFFLINE', roles: [WorkspaceRole.BUYER] }
        ]
      },
      {
        id: 'm3-2',
        title: 'Air Freight',
        icon: 'Plane',
        mfeId: 'tracking-air',
        isOnline: true,
        roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR],
        children: [
          { id: 'm3-2-1', title: 'Flight Schedules', icon: 'Clock', mfeId: 'tracking-flight', isOnline: true, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-2-2', title: 'AWB Smart Track', icon: 'Database', mfeId: 'tracking-awb', isOnline: false, statusLabel: 'MAINTENANCE', roles: [WorkspaceRole.BUYER] }
        ]
      },
      {
        id: 'm3-3',
        title: 'Road Distribution',
        icon: 'Truck',
        mfeId: 'tracking-land',
        isOnline: false,
        statusLabel: 'UNAVAILABLE',
        roles: [WorkspaceRole.BUYER, WorkspaceRole.FREIGHT_FORWARDER],
        children: [
          { id: 'm3-3-1', title: 'Fleet Dispatch', icon: 'Users', mfeId: 'tracking-truck', isOnline: false, roles: [WorkspaceRole.BUYER] },
          { id: 'm3-3-2', title: 'Route Optimization', icon: 'Navigation', mfeId: 'tracking-route', isOnline: false, roles: [WorkspaceRole.BUYER] }
        ]
      }
    ]
  },
  { 
    id: 'm4', 
    title: 'SCM Collaboration', 
    icon: 'Layers', 
    mfeId: 'scm', 
    isOnline: false, 
    statusLabel: 'OFFLINE', 
    roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR],
    children: [
      { id: 'm4-1', title: 'Inventory Management', icon: 'Box', mfeId: 'scm.inventory', isOnline: false, roles: [WorkspaceRole.BUYER] },
      { id: 'm4-2', title: 'Demand Forecast', icon: 'BarChart3', mfeId: 'scm.forecast', isOnline: false, roles: [WorkspaceRole.BUYER] }
    ]
  },
  { id: 'm7', title: 'Analytics Reports', icon: 'BarChart3', mfeId: 'reporting', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] },
  { id: 'm1', title: 'System Management', icon: 'Settings', mfeId: 'system', isOnline: true, roles: [WorkspaceRole.BUYER, WorkspaceRole.VENDOR, WorkspaceRole.FREIGHT_FORWARDER] },
];

export const getIcon = (name: string, className = "w-4 h-4") => {
  const icons: Record<string, any> = {
    LayoutDashboard, Package, Truck, FileText, Users, Settings, BarChart3, Globe, ShieldCheck, Database, Box, Home, Store, ShoppingCart, Layers, MapPin, Anchor, Plane, Navigation, Compass, FilePlus, Play, CloudOff, TrendingUp, Clock
  };
  const IconComp = icons[name] || LayoutDashboard;
  return <IconComp className={className} />;
};
