export interface Project {
  id: string;
  name: string;
  projectOwner: ProjectOwner;
  description?: string;
  tenantKey: string;
  projectEmail?: string;
  projectOwnerId?: string;
}

interface ProjectOwner {
  id: string;
  employeeId: string;
  managerEmployeeId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

export enum Persona {
  ReadOnly = 'READONLY',
  ReadWrite = 'READWRITE',
  Admin = 'ADMIN'
}
