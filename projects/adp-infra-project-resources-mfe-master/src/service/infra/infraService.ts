import infraClient, { infraApiRoutes } from 'service/infraClient';
import { buildQueryParams } from 'utils/apiUtils';
import { getLogger } from 'utils';

const logger = getLogger('infraService');

/**
 * Get domains by tenant key
 *
 * @param tenantKey - The tenant key to filter domains
 * @returns the list of domains for the tenant
 */
export const getDomainsByTenantKey = async (tenantKey: string) => {
  try {
    const response = await infraClient.get(
      infraApiRoutes.domainManagement.domains(tenantKey)
    );
    return response.data;
  } catch (error) {
    logger.error(
      { error },
      `Failed to fetch domains for tenant key ${tenantKey}`
    );
    throw error;
  }
};

/**
 * Get all domain names
 *
 * @returns the list of all domain names
 */
export const getAllDomainNames = async () => {
  try {
    const response = await infraClient.get(
      infraApiRoutes.domainManagement.domainNames
    );
    return response.data;
  } catch (error) {
    logger.error({ error }, 'Failed to fetch all domain names');
    throw error;
  }
};

/**
 * Get domain resources by domain name
 *
 * @param domainName - The domain name to fetch resources for
 * @returns the domain resources
 */
export const getDomainResourcesByName = async (domainName: string) => {
  try {
    const queryParams = buildQueryParams({ domain_name: domainName });
    const response = await infraClient.get(
      `${infraApiRoutes.domainManagement.domainResource}${queryParams}`
    );
    return response.data;
  } catch (error) {
    logger.error(
      { error },
      `Failed to fetch domain resources for ${domainName}`
    );
    throw error;
  }
};
