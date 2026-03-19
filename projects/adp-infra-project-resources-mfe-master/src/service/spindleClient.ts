import axios from 'axios';
import {
  handleErrors,
  getSpindleRootUrl,
  getBearerToken
} from 'utils/apiUtils';
import { fetchSpindleApi } from 'utils/envVariables';

const spindleClient = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

spindleClient.interceptors.request.use(async (config) => {
  // Set baseURL dynamically to avoid calling getSpindleRootUrl at module load time
  if (!config.baseURL) {
    // eslint-disable-next-line no-param-reassign
    config.baseURL = `${getSpindleRootUrl()}/api`;
  }

  const token = await getBearerToken();

  if (token === undefined && !window.location.origin.includes('localhost')) {
    const spindleApiUrl = fetchSpindleApi();
    window.location.href = `${spindleApiUrl}/oauth2/authorization/oauth-client`;
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

spindleClient.interceptors.response.use(
  (response) => response,
  (error) => handleErrors(error)
);

export const spindleApiRoutes = {
  users: {
    currentUser: 'users/current-user',
    username: (username: string) => `users/username/${username}`,
    projects: (username: string | undefined) =>
      `/users/username/${username}/projects`,
    allProjects: 'projects'
  },
  domains: {
    startWorkflow: 'workflows'
  },
  projects: {
    users: (projectId: string) => `projects/${projectId}/users`
  }
};

export default spindleClient;
