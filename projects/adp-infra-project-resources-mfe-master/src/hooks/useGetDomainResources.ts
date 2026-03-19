import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDomainResourcesByName } from 'service/infra/infraService';

const defaultOptions = {
  meta: {
    errorMessage: 'Failed to load domain resources',
    successMessage: undefined
  }
};

const useGetDomainResources = (
  domainName: string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseQueryOptions<any, Error, any>
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuery<any, Error, any>({
    queryKey: ['domain-resources', domainName],
    queryFn: async () => getDomainResourcesByName(domainName!),
    enabled: !!domainName,
    ...defaultOptions,
    ...options
  });

export default useGetDomainResources;
