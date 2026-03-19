import spindleClient, { spindleApiRoutes } from 'service/spindleClient';
import { Project } from 'types/project';
import { SpindleUser, ProjectUser } from 'types/user';
import { CreateDomainRequest, CreateDomainResponse } from 'types/domain';
import { getLogger } from 'utils';

const logger = getLogger('spindleService');

/**
 * Gets the current user
 *
 * @returns the datastructure of the user
 */
export const getCurrentUser = async () =>
  spindleClient
    .get<SpindleUser>(spindleApiRoutes.users.currentUser)
    .then((response) => response.data);

/**
 * Gets all Spindle projects in the env
 *
 * @returns the list of all projects
 */
export const getAllProjects = async () =>
  spindleClient
    .get<Project[]>(spindleApiRoutes.users.allProjects)
    .then((response) => response.data);

/**
 * Get current user's projects
 *
 * @param username username of current user
 * @returns list of projects for the current user
 */
export const getCurrentUserProjects = async (username: string) => {
  if (username !== '' || username !== undefined) {
    return spindleClient
      .get<Project[]>(spindleApiRoutes.users.projects(username))
      .then((response) => response.data)
      .then((projects) => projects.sort((a, b) => a.name.localeCompare(b.name)))
      .catch((e) => {
        logger.debug(`Failed to fetch projects for user ${username}`, e);
        return [];
      });
  }
  return [];
};

/**
 * Gets project users
 *
 * @param projectId the project ID
 * @returns list of project users with their personas and isProjectAdmin flag
 */
export const getProjectUsers = async (projectId: string) => {
  try {
    const response = await spindleClient.get<ProjectUser[]>(
      spindleApiRoutes.projects.users(projectId)
    );
    return response.data;
  } catch (error) {
    logger.debug({ error }, `Failed to fetch users for project ${projectId}`);
    return [];
  }
};

/**
 * Creates a new domain by starting a workflow
 *
 * @param domain domain creation request payload
 * @returns response indicating success or failure
 */
export const createDomain = async (
  domain: CreateDomainRequest
): Promise<CreateDomainResponse> => {
  try {
    const response = await spindleClient.post<{ id?: string }>(
      spindleApiRoutes.domains.startWorkflow,
      domain
    );

    return {
      success: response.status === 200,
      message: 'You have successfully submitted your request.',
      data: response.data
    };
  } catch (error) {
    logger.debug({ error }, 'Failed to create domain');
    throw error; // Throw error so React Query can handle it properly
  }
};
