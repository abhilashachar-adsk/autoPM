import React, { useState, useEffect } from 'react';
import { Box } from '@weave-mui/material';
import { Tabs, Tab } from '@mui/material';
import useGetDomainResources from '../../hooks/useGetDomainResources';
import LoadingOverlay from '../layout/LoadingOverlay';
import GenericErrorOverlay from '../layout/GenericErrorOverlay';
import EmptyStateOverlay from '../layout/EmptyStateOverlay';
import EnvironmentTab from './DataLakeEnvironmentTab';
import SnowflakeEnvironmentTab from './SnowflakeEnvironmentTab';
import { getResourceTypeLabel } from '../../utils/storageUtils';

interface DomainDetailsProps {
  domainName: string;
  resourceType: string;
  availableResourceTypes: string[];
}

const ENVIRONMENTS = ['dev', 'stg', 'prd'] as const;

const DomainDetails: React.FC<DomainDetailsProps> = ({
  domainName,
  resourceType,
  availableResourceTypes
}) => {
  const [activeResourceTab, setActiveResourceTab] = useState(0);
  const [activeEnvTab, setActiveEnvTab] = useState(0);
  const { data, isLoading, isError, error } = useGetDomainResources(domainName);

  const handleResourceTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveResourceTab(newValue);
  };

  const handleEnvTabChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setActiveEnvTab(newValue);
  };

  // Filter available resource types based on what's actually in the payload
  // If availableResourceTypes is empty, auto-detect from the API response
  const availableResourcesInPayload =
    availableResourceTypes.length > 0
      ? availableResourceTypes.filter((resType) => {
          if (!data?.resources) return false;
          const resourceData =
            resType === 'HIVE' ? data.resources.HIVE : data.resources.SNOWFLAKE;
          return resourceData !== null && resourceData !== undefined;
        })
      : // Auto-detect from API response when no types provided
        Object.entries(data?.resources || {})
          .filter(([, value]) => value !== null && value !== undefined)
          .map(([key]) => key);

  // Set initial resource tab based on resourceType from parent
  useEffect(() => {
    if (availableResourcesInPayload.length > 0) {
      const index = availableResourcesInPayload.findIndex(
        (r) => r === resourceType
      );
      if (index !== -1) {
        setActiveResourceTab(index);
      } else {
        setActiveResourceTab(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceType, data]);

  // Reset environment tab when resource type changes
  useEffect(() => {
    setActiveEnvTab(0);
  }, [activeResourceTab]);

  // Get current resource type based on active tab
  const currentResourceType = availableResourcesInPayload[activeResourceTab];

  // Extract the relevant resource data based on current resource type
  const getResourceData = () => {
    if (!data?.resources) return null;

    if (currentResourceType === 'HIVE') {
      return data.resources.HIVE;
    }
    if (currentResourceType === 'SNOWFLAKE') {
      return data.resources.SNOWFLAKE;
    }
    return null;
  };

  const resourceData = getResourceData();

  // Check if we have database data with environments for HIVE
  const hasHiveEnvData =
    currentResourceType === 'HIVE' &&
    (resourceData?.database?.dev ||
      resourceData?.database?.stg ||
      resourceData?.database?.prd);

  // Check if we have Snowflake data
  const hasSnowflakeData =
    currentResourceType === 'SNOWFLAKE' &&
    (resourceData?.schema || resourceData?.limited_schema);

  return (
    <div className="domain-details-container">
      {isLoading && <LoadingOverlay />}
      {!isLoading && isError && (
        <GenericErrorOverlay errorMessage={error?.message} />
      )}
      {!isLoading && !isError && (!resourceData || !currentResourceType) && (
        <EmptyStateOverlay
          message="No resources found"
          description="There are no resources configured for this domain"
        />
      )}
      {!isLoading && !isError && resourceData && (
        <Box sx={{ width: '100%' }}>
          {/* Resource Type Tabs */}
          {availableResourcesInPayload.length > 0 && (
            <Box sx={{ marginBottom: '16px' }}>
              <Tabs
                value={activeResourceTab}
                onChange={handleResourceTabChange}
                sx={{
                  minHeight: '36px',
                  '& .MuiTabs-indicator': {
                    display: 'none'
                  }
                }}
              >
                {availableResourcesInPayload.map((resType, index) => (
                  <Tab
                    key={resType}
                    label={getResourceTypeLabel(resType)}
                    sx={{
                      minHeight: '36px',
                      padding: '8px 16px',
                      textTransform: 'none',
                      fontSize: '14px',
                      fontWeight: 500,
                      borderRadius: '8px 8px 0 0',
                      backgroundColor:
                        activeResourceTab === index ? '#F5F5F5' : 'transparent',
                      color: '#000',
                      '&.Mui-selected': {
                        backgroundColor: '#F5F5F5',
                        color: '#000'
                      },
                      '&:not(.Mui-selected)': {
                        opacity: 0.6
                      }
                    }}
                  />
                ))}
              </Tabs>
            </Box>
          )}

          {/* Environment Tabs (for HIVE/Data Lake) */}
          {hasHiveEnvData && (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeEnvTab} onChange={handleEnvTabChange}>
                  {ENVIRONMENTS.map((env, index) => (
                    <Tab
                      key={env}
                      label={env.toUpperCase()}
                      id={`env-tab-${index}`}
                      aria-controls={`env-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
              {ENVIRONMENTS.map((env, index) => (
                <EnvironmentTab
                  key={env}
                  data={resourceData.database?.[env]}
                  environment={env.toUpperCase()}
                  isActive={activeEnvTab === index}
                />
              ))}
            </>
          )}

          {/* Environment Tabs (for Snowflake) */}
          {hasSnowflakeData && (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeEnvTab} onChange={handleEnvTabChange}>
                  {ENVIRONMENTS.map((env, index) => (
                    <Tab
                      key={env}
                      label={env.toUpperCase()}
                      id={`snowflake-env-tab-${index}`}
                      aria-controls={`snowflake-env-tabpanel-${index}`}
                    />
                  ))}
                </Tabs>
              </Box>
              {ENVIRONMENTS.map((env, index) => (
                <SnowflakeEnvironmentTab
                  key={env}
                  data={resourceData}
                  environment={env.toUpperCase()}
                  isActive={activeEnvTab === index}
                />
              ))}
            </>
          )}

          {/* JSON Data (when no structured data available) */}
          {!hasHiveEnvData && !hasSnowflakeData && resourceData && (
            <pre className="domain-details-json">
              {JSON.stringify(resourceData, null, 2)}
            </pre>
          )}
        </Box>
      )}
    </div>
  );
};

export default DomainDetails;
