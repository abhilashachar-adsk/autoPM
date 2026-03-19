import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getDomainsByTenantKey } from 'service/infra/infraService';

const defaultOptions = {
  meta: {
    errorMessage: 'Failed to load domains',
    successMessage: undefined
  }
};

const useGetDomainsByTenantKey = (
  tenantKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseQueryOptions<any[], Error, any[]>
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuery<any[], Error, any[]>({
    queryKey: ['domains', tenantKey],
    queryFn: async () => getDomainsByTenantKey(tenantKey),
    enabled: !!tenantKey,
    ...defaultOptions,
    ...options
  });

export default useGetDomainsByTenantKey;
