import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getCurrentUserProjects } from 'service/spindle/spindleService';
import { spindleApiRoutes } from 'service/spindleClient';
import { Project } from 'types/project';

const defaultOptions = {
  meta: {
    errorMessage: "Failed to load the current user's projects",
    successMessage: undefined
  }
};

const useGetCurrentUserProjects = (
  username: string | undefined,
  options?: UseQueryOptions<Project[], Error, Project[]>
) =>
  useQuery<Project[], Error, Project[]>({
    queryKey: [spindleApiRoutes.users.projects(username)],
    queryFn: async () => {
      if (!username) return [];
      return getCurrentUserProjects(username);
    },
    ...defaultOptions,
    ...options
  });

export default useGetCurrentUserProjects;
