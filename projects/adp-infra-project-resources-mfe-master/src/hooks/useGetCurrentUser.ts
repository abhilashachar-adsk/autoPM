import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCurrentUser } from 'service/spindle/spindleService';
import { spindleApiRoutes } from 'service/spindleClient';
import { SpindleUser } from 'types/user';

const defaultOptions = {
  meta: {
    errorMessage: 'Failed to load the current user',
    successMessage: undefined
  }
};

const useGetCurrentUser = (
  options?: UseQueryOptions<SpindleUser, Error, SpindleUser>
) =>
  useQuery<SpindleUser, Error, SpindleUser>({
    queryKey: [spindleApiRoutes.users.currentUser],
    queryFn: getCurrentUser,
    ...defaultOptions,
    ...options
  });

export default useGetCurrentUser;
