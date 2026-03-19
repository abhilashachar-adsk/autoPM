import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  accordionPositions,
  accordionIcons,
  Link
} from '@weave-mui/material';
import { ExternalM } from '@weave-mui/icons-weave';
import { Domain } from 'types/domain';
import './StoragePage.css';
import DomainDetails from './DomainDetails';

interface DomainListItemProps {
  domain: Domain;
  getStatusStyles: (status: string) => { border: string; background: string };
  getResourceTypeLabel: (resource: string) => string;
}

const DomainListItem: React.FC<DomainListItemProps> = ({
  domain,
  getStatusStyles,
  getResourceTypeLabel
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState<string>(
    domain.request_status?.[0]?.resource || ''
  );

  const { LEFT } = accordionPositions;
  const { CARET } = accordionIcons;

  const handleChange = () => {
    setExpanded(!expanded);
  };

  // Get all resource types with their statuses
  const resourceStatuses =
    (domain.request_status || []).length > 0
      ? (domain.request_status || []).map((rs) => ({
          resource: rs.resource,
          status: rs.status,
          resourceLabel: getResourceTypeLabel(rs.resource),
          statusStyles: getStatusStyles(rs.status)
        }))
      : [
          {
            resource: '',
            status: 'UNKNOWN',
            resourceLabel: '',
            statusStyles: getStatusStyles('UNKNOWN')
          }
        ];

  return (
    <Accordion
      className="storage-resource-accordion"
      position={LEFT}
      icon={CARET}
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px'
          }}
        >
          <Box className="storage-resource-left-section">
            <Typography className="storage-resource-title">
              {domain.domain_name}
            </Typography>
            <Typography className="storage-resource-description">
              <span className="storage-resource-description-label">
                Storage Description:
              </span>{' '}
              {domain.domain_description || 'N/A'}
            </Typography>
            <Link
              href="https://data.autodesk.com/query-experience"
              target="_blank"
              rel="noopener noreferrer"
              className="storage-resource-external-link"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalM sx={{ fontSize: '16px' }} />
              ADP Studio
            </Link>
          </Box>
          <Box className="storage-resource-types-container">
            {resourceStatuses.map((rs, index) => (
              <Box
                key={rs.resource || `empty-${index}`}
                className="storage-resource-type-with-status"
                onClick={(e) => {
                  e.stopPropagation();
                  if (rs.resource) {
                    setSelectedResourceType(rs.resource);
                  }
                }}
                sx={{
                  cursor: rs.resource ? 'pointer' : 'default'
                }}
              >
                <Typography className="storage-resource-type">
                  {rs.resourceLabel}
                </Typography>
                <Box
                  component="button"
                  className="storage-resource-status-badge"
                  style={{
                    border: rs.statusStyles.border,
                    background: rs.statusStyles.background
                  }}
                  type="button"
                >
                  {rs.status}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <DomainDetails
          domainName={domain.domain_name}
          resourceType={selectedResourceType}
          availableResourceTypes={resourceStatuses
            .map((rs) => rs.resource)
            .filter((r) => r !== '')}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default DomainListItem;
