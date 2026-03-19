import { HttpErrors } from 'types/enums';
import { JwtTokenPayload } from 'types/token';
import { Project } from 'types/project';
import { jwtDecode } from 'jwt-decode';
import { fetchSpindleApi } from './envVariables';

/**
 * Spindle-related tools
 */
const getSpindleRootUrl = () => fetchSpindleApi();

const getBearerToken = async () =>
  process.env.LOCAL_TOKEN
    ? process.env.LOCAL_TOKEN
    : fetch(`${getSpindleRootUrl()}/utility/access-token`).then((response) =>
        response.text()
      );

const getOid = async (): Promise<string> => {
  const token = await getBearerToken();
  const decodedToken = jwtDecode<JwtTokenPayload>(token);
  return decodedToken.oid;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildQueryParams = (params: Record<string, any>): string => {
  const queryString = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join('&');
  return queryString ? `?${queryString}` : '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrors = (error: any): Promise<never> => {
  if (error.response === undefined && error.request.status === 0) {
    // Handle network errors or CORS issues
    return Promise.reject(error);
  }

  const status = error.response?.status;
  let errorMessage = 'An unknown error occurred. Please try again later.';

  switch (status) {
    case HttpErrors.FORBIDDEN:
      errorMessage = 'You do not have permission to perform this action.';
      break;
    case HttpErrors.NOT_FOUND:
      errorMessage = 'The requested resource was not found.';
      break;
    case HttpErrors.UNAUTHORIZED:
      errorMessage = 'You are not authorized. Please log in and try again.';
      break;
    case HttpErrors.BAD_REQUEST:
      errorMessage =
        'The request was invalid. Please check your input and try again.';
      break;
    case HttpErrors.INTERNAL_SERVER_ERROR:
      errorMessage =
        'An internal server error occurred. Please try again later.';
      break;
    default:
      if (status >= 400 && status < 500) {
        errorMessage =
          'A client error occurred. Please check your request and try again.';
      } else if (status >= 500) {
        errorMessage = 'A server error occurred. Please try again later.';
      }
      break;
  }

  const customError = new Error(errorMessage);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (customError as any).status = status;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (customError as any).originalError = error;

  return Promise.reject(customError);
};

const timeoutConstant = 1000;

const createProjectNameToIdMap = (
  projects?: Project[]
): Record<string, string> =>
  projects?.reduce((acc: Record<string, string>, project: Project) => {
    acc[project.name] = project.id;
    return acc;
  }, {}) || {};

const createProjectNameToTenantKeyMap = (
  projects?: Project[]
): Record<string, string> =>
  projects?.reduce((acc: Record<string, string>, project: Project) => {
    acc[project.name] = project.tenantKey;
    return acc;
  }, {}) || {};

const createProjectIdToTenantKeyMap = (
  projects?: Project[]
): Record<string, string> =>
  projects?.reduce((acc: Record<string, string>, project: Project) => {
    acc[project.id] = project.tenantKey;
    return acc;
  }, {}) || {};

export {
  buildQueryParams,
  handleErrors,
  getBearerToken,
  getOid,
  getSpindleRootUrl,
  timeoutConstant,
  createProjectNameToIdMap,
  createProjectNameToTenantKeyMap,
  createProjectIdToTenantKeyMap
};
