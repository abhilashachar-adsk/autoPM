import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo
} from 'react';
import useGetCurrentUser from 'hooks/useGetCurrentUser';
import useGetCurrentUserProjects from 'hooks/useGetCurrentUserProjects';
import useGetProjectUsers from 'hooks/useGetProjectUsers';
import { SpindleUser, ProjectUser } from 'types/user';
import { Project } from 'types/project';
import { localProjects } from 'utils/envVariables';

const mockUser: SpindleUser = {
  id: 'local',
  username: 'local',
  email: 'local@email.com',
  adskeng: 'local_user',
  currentlyActive: true,
  identifier: 'local',
  roles: ['ROLE_SPINDLE_READER']
};

const mockProject: Project[] = localProjects;

export const SpindleContext = createContext<
  | {
      user: SpindleUser;
      projects: Project[] | undefined;
      projectUsers: ProjectUser[] | undefined;
      isProjectAdmin: boolean;
      currentProjectId: string | null;
    }
  | undefined
>(undefined);

export const SpindleProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SpindleUser>(mockUser);
  const [projects, setProjects] = useState<Project[]>();
  const [projectUsers, setProjectUsers] = useState<ProjectUser[]>();
  const [isProjectAdmin, setIsProjectAdmin] = useState<boolean>(false);

  // Listen to currently selected project from sessionStorage
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(
    sessionStorage.getItem('defaultProjectId')
  );

  const { data: currentUser } = useGetCurrentUser();
  const { data: currentProjects } = useGetCurrentUserProjects(
    currentUser?.username
  );

  // Fetch project users for the currently selected project
  const { data: fetchedProjectUsers } = useGetProjectUsers(
    currentProjectId || '',
    {
      enabled: !!currentProjectId
    }
  );

  console.log('currentProjects', currentProjects);

  const local: boolean = process.env.LOCAL_TOKEN !== undefined;

  // Poll sessionStorage for project changes
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const startPolling = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          const currentValue = sessionStorage.getItem('defaultProjectId');
          if (currentValue !== currentProjectId) {
            setCurrentProjectId(currentValue);
          }
        }, 1000);
      }
    };

    const stopPolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        const currentValue = sessionStorage.getItem('defaultProjectId');
        if (currentValue !== currentProjectId) {
          setCurrentProjectId(currentValue);
        }
        startPolling();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!document.hidden) {
      startPolling();
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopPolling();
    };
  }, [currentProjectId]);

  useEffect(() => {
    if (local) {
      setUser(mockUser);
      return;
    }

    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, local]);

  useEffect(() => {
    if (local) {
      setProjects(mockProject);
      return;
    }

    if (currentUser?.username) {
      if (currentProjects) setProjects(currentProjects);
    }
  }, [currentUser, currentProjects, local]);

  useEffect(() => {
    if (fetchedProjectUsers) {
      setProjectUsers(fetchedProjectUsers);

      // Find if current user is a project admin
      const currentUserProjectUser = fetchedProjectUsers.find(
        (projectUser) => projectUser.user.id === currentUser?.id
      );

      if (currentUserProjectUser) {
        setIsProjectAdmin(currentUserProjectUser.isProjectAdmin);
      } else {
        // User not found in project users, so they're not an admin
        setIsProjectAdmin(false);
      }
    } else {
      // No project users fetched, reset admin status
      setIsProjectAdmin(false);
    }
  }, [fetchedProjectUsers, currentUser]);

  const contextValue = useMemo(
    () => ({ user, projects, projectUsers, isProjectAdmin, currentProjectId }),
    [user, projects, projectUsers, isProjectAdmin, currentProjectId]
  );

  return (
    <SpindleContext.Provider value={contextValue}>
      {children}
    </SpindleContext.Provider>
  );
};

export const useSpindleContext = () => {
  const context = useContext(SpindleContext);
  if (context === undefined) {
    throw new Error('useSpindleContext must be used within a SpindleProvider');
  }
  return context;
};
