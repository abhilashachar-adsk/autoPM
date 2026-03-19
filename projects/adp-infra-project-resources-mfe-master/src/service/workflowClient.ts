import axios from 'axios';
import { handleErrors, getBearerToken } from 'utils/apiUtils';
import { fetchSpindleApi } from 'utils/envVariables';

/**
 * Axios client for the Workflow Service API
 * Uses the same base URL as Spindle (access API) which proxies to the workflow service
 */
const workflowClient = axios.create({
  headers: {
    'Content-type': 'application/json'
  }
});

workflowClient.interceptors.request.use(async (config) => {
  // Set baseURL dynamically to avoid calling at module load time
  if (!config.baseURL) {
    // eslint-disable-next-line no-param-reassign
    config.baseURL = `${fetchSpindleApi()}/api`;
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

workflowClient.interceptors.response.use(
  (response) => response,
  (error) => handleErrors(error)
);

export const workflowApiRoutes = {
  executeWorkflow: 'temporal/execute-workflow'
};

export default workflowClient;
