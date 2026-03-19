import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, Tooltip } from '@weave-mui/material';
import {
  typographyVariants,
  buttonVariants,
  tooltipPlacement,
  tooltipSize
} from '@weave-mui/enums';
import { AddS } from '@weave-mui/icons-weave';
import './StoragePage.css';
import DataBaseIcon from '../../common/icons/database.png';
import useGetDomainsByTenantKey from '../../hooks/useGetDomainsByTenantKey';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import useGetCurrentUserProjects from '../../hooks/useGetCurrentUserProjects';
import { useSpindleContext } from '../../state/SpindleContext';
import DomainListItem from './DomainListItem';
import LoadingOverlay from '../layout/LoadingOverlay';
import GenericErrorOverlay from '../layout/GenericErrorOverlay';
import EmptyStateOverlay from '../layout/EmptyStateOverlay';
import ActiveProjectEmptyState from '../layout/ActiveProjectEmptyState';
import CreateDomainModal from './CreateDomainModal';
import {
  getStatusStyles,
  getResourceTypeLabel
} from '../../utils/storageUtils';
import { createProjectIdToTenantKeyMap } from '../../utils/apiUtils';
import { getEnv, Environment } from '../../utils/envVariables';
import { storagePageTooltips } from '../../utils/formTooltips';

const StoragePage = () => {
  // Modal state for Create Domain
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: currentUser } = useGetCurrentUser();
  const { data: projects } = useGetCurrentUserProjects(currentUser?.username);
  const { isProjectAdmin, currentProjectId: projectId } = useSpindleContext();

  const projectIdToTenantKeyMap = useMemo(
    () => createProjectIdToTenantKeyMap(projects),
    [projects]
  );

  const tenantKey = projectId ? projectIdToTenantKeyMap[projectId] : undefined;

  // Get the current project's name for workflow-service
  const currentProject = useMemo(
    () => projects?.find((p) => p.id === projectId),
    [projects, projectId]
  );
  const teamName = currentProject?.name || '';

  // Check if project is selected (not null, not empty string)
  const hasValidActiveProject = !!(projectId && projectId.trim() !== '');

  // In DEV environment, enable query even without tenantKey (uses mocked data)
  const isDevEnvironment = getEnv() === Environment.DEV;
  const shouldEnableQuery =
    hasValidActiveProject && (isDevEnvironment || !!tenantKey);

  const {
    data: domains,
    isLoading,
    isError,
    error
  } = useGetDomainsByTenantKey(tenantKey || '', {
    enabled: shouldEnableQuery
  });

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Box component="header" className="storage-page-header">
        <Box
          component="img"
          src={DataBaseIcon}
          alt=""
          className="storage-page-header-icon"
        />
        <Typography
          variant={typographyVariants.H1_BOLD}
          data-testid="storage-page-title"
        >
          Storage
          {domains && domains.length > 0 ? ` (${domains.length})` : ''}
        </Typography>
        {hasValidActiveProject && (
          <Tooltip
            data-testid="new-domain-tooltip"
            title={
              !isProjectAdmin
                ? storagePageTooltips.createStorageAdminOnly
                : 'Create new storage'
            }
            arrow
            placement={tooltipPlacement.TOP}
            size={tooltipSize.SMALL}
          >
            <span>
              <Button
                data-testid="new-domain-button"
                onClick={handleOpenCreateModal}
                variant={buttonVariants.CONTAINED}
                size="small"
                disabled={!isProjectAdmin}
                sx={{
                  ml: 2,
                  minWidth: 'unset',
                  width: '32px',
                  height: '32px',
                  padding: '4px'
                }}
              >
                <AddS />
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>

      <Box className="storage-page-content">
        <Box className="storage-page-content-container">
          {!hasValidActiveProject && <ActiveProjectEmptyState />}
          {hasValidActiveProject && isLoading && <LoadingOverlay />}
          {hasValidActiveProject && !isLoading && isError && (
            <GenericErrorOverlay errorMessage={error?.message} />
          )}
          {hasValidActiveProject &&
            !isLoading &&
            !isError &&
            (!domains || domains.length === 0) && (
              <EmptyStateOverlay
                message="No storage resources available"
                description="There are no domains configured for this tenant"
              />
            )}
          {hasValidActiveProject &&
            !isLoading &&
            !isError &&
            domains &&
            domains.length > 0 && (
              <Box className="storage-page-resources-list">
                {domains.map((domain) => (
                  <DomainListItem
                    key={domain.domain_id}
                    domain={domain}
                    getStatusStyles={getStatusStyles}
                    getResourceTypeLabel={getResourceTypeLabel}
                  />
                ))}
              </Box>
            )}
        </Box>
      </Box>

      {/* Create Domain Modal */}
      {projectId && tenantKey && teamName && (
        <CreateDomainModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          projectId={projectId}
          teamName={teamName}
          tenantKey={tenantKey}
        />
      )}
    </>
  );
};

export default StoragePage;
