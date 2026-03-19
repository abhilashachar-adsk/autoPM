/**
 * This file is used to store all the environment variables used in the application.
 * As per the Spindle team's advise in Jul 2024, we are unable to retreieve environment
 * variables at runtime. They are to be hardcoded in the codebase, and have each MFE
 * be environment agnostic.
 */

const Environment = {
  DEV: 'dev',
  STG: 'stg',
  PRD: 'prd'
};

const getEnv = () =>
  process.env.LOCAL_TOKEN
    ? Environment.DEV
    : window.cfp.providers.environment.get();

const SpindleUri: Record<string, string> = {
  [Environment.DEV]: 'https://access-dev.adp.autodesk.com',
  [Environment.STG]: 'https://access-stg.adp.autodesk.com',
  [Environment.PRD]: 'https://access.adp.autodesk.com'
};

let cachedSpindleApiUri: string;

const fetchSpindleApi = (): string => {
  if (cachedSpindleApiUri) {
    return cachedSpindleApiUri;
  }

  // Use Spindle access URIs based on the current environment
  const env = getEnv();
  cachedSpindleApiUri = (SpindleUri[env] ||
    SpindleUri[Environment.DEV]) as string;
  return cachedSpindleApiUri;
};
/**
 * API routes for the domain management service
 * These URLs match the onboarding MFE endpoints
 */
const DomainApiUri: Record<string, string> = {
  [Environment.DEV]:
    'https://domain-management-api-alb.adpcp-c-uw2.cloudos.autodesk.com',
  [Environment.STG]:
    'https://domain-management-api-alb.adpcp-s-ue1.cloudos.autodesk.com',
  [Environment.PRD]:
    'https://domain-management-api-alb.adpcp-p-ue1.cloudos.autodesk.com'
};

let cachedDomainApiUri: string;

const fetchDomainApiBaseUrl = (): string => {
  if (cachedDomainApiUri) {
    return cachedDomainApiUri;
  }

  const env = getEnv();
  cachedDomainApiUri = (DomainApiUri[env] ||
    DomainApiUri[Environment.DEV]) as string;
  return cachedDomainApiUri;
};

const INFRA_API_BASE_URL = fetchDomainApiBaseUrl();

/**
 * Get the character limit for domain names based on environment
 * DEV/STG: 14 characters
 * PRD: 18 characters
 */
const fetchCharLimit = (): number => {
  const env = getEnv();
  switch (env) {
    case Environment.DEV:
      return 14;
    case Environment.STG:
      return 14;
    case Environment.PRD:
      return 18;
    default:
      return 14;
  }
};

const localProjects = [
  {
    // IMPORTANT: This is for local development only
    id: 'a7ee19bc-13df-4f2c-bac3-d218a21e9d37',
    name: 'Local Project',
    projectOwner: {
      id: 'owner1',
      employeeId: 'eid1',
      managerEmployeeId: 'eid2',
      email: 'local_owner@example.com',
      username: 'user',
      firstName: 'owner',
      lastName: '1'
    },
    description: 'Description for Local Project 1',
    tenantKey: 'tenant1',
    projectEmail: 'local@example.com',
    projectOwnerId: 'owner1'
  }
];

export {
  fetchSpindleApi,
  fetchDomainApiBaseUrl,
  fetchCharLimit,
  getEnv,
  Environment,
  localProjects,
  INFRA_API_BASE_URL
};
