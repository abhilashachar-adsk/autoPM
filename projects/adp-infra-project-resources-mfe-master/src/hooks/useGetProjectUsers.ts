import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProjectUsers } from 'service/spindle/spindleService';
import { spindleApiRoutes } from 'service/spindleClient';
import { ProjectUser } from 'types/user';

const defaultOptions = {
  meta: {
    errorMessage: 'Failed to load project users',
    successMessage: undefined
  }
};

const useGetProjectUsers = (
  projectId: string,
  options?: UseQueryOptions<ProjectUser[], Error, ProjectUser[]>
) =>
  useQuery<ProjectUser[], Error, ProjectUser[]>({
    queryKey: [spindleApiRoutes.projects.users(projectId)],
    queryFn: () => getProjectUsers(projectId),
    enabled: !!projectId,
    ...defaultOptions,
    ...options
  });

export default useGetProjectUsers;
