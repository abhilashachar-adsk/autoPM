import axios from 'axios';
import { handleErrors, getBearerToken } from 'utils/apiUtils';
import { fetchDomainApiBaseUrl } from 'utils/envVariables';

const infraClient = axios.create({
  headers: {
    'Content-type': 'application/json',
    AzureAuthentication: 'true'
  }
});

infraClient.interceptors.request.use(async (config) => {
  const token = await getBearerToken();
  const baseURL = fetchDomainApiBaseUrl();

  // eslint-disable-next-line no-param-reassign
  config.baseURL = baseURL;
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

infraClient.interceptors.response.use(
  (response) => response,
  (error) => handleErrors(error)
);

const basePath = 'adpinfra/v1/domainmgmt';

export const infraApiRoutes = {
  domainManagement: {
    domains: (tenantKey: string) =>
      `${basePath}/domains?tenant_key=${tenantKey}`,
    domainResource: `${basePath}/domains/resource`,
    domainNames: `${basePath}/domains/domain_names`
  }
};

export default infraClient;
