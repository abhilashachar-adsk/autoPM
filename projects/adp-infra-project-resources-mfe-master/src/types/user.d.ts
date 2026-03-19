export interface SpindleUser extends SpindleUserLite {
  employeeId?: number;
  managerEmployeeId?: number;
  firstName?: string;
  lastName?: string;
  orgDivision?: string;
  orgName?: string;
  currentlyActive: boolean;
  identifier: string;
  roles: string[];
}

export interface SpindleUserLite {
  id: string;
  username: string;
  preferredName?: string;
  email: string;
  adskeng?: string;
}

export interface ProjectUser {
  id: string;
  persona: 'ADMIN' | 'READWRITE' | 'READONLY';
  user: SpindleUserLite;
  isOwner: boolean;
  isProjectAdmin: boolean;
}

export interface SecurityRoles {
  name: SpindleSecurityRole;
}

export enum SpindleSecurityRole {
  ROLE_SPINDLE_READER = 'ROLE_SPINDLE_READER',
  ROLE_SPINDLE_ADMIN = 'ROLE_SPINDLE_ADMIN',
  ROLE_SPINDLE_MANAGER = 'ROLE_SPINDLE_MANAGER'
}
