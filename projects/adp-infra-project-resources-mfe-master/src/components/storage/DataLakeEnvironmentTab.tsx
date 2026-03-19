import React, { useMemo } from 'react';
import { Box, Typography } from '@weave-mui/material';
import EmptyStateOverlay from '../layout/EmptyStateOverlay';
import './StoragePage.css';

interface EnvironmentTabProps {
  data: Array<{ name: string; location: string }> | null | undefined;
  environment: string;
  isActive: boolean;
}

interface CategorizedData {
  raw: Array<{ name: string; location: string }>;
  internal: Array<{ name: string; location: string }>;
  export: Array<{ name: string; location: string }>;
}

const categorizeByLocation = (
  data: Array<{ name: string; location: string }>
): CategorizedData => {
  const categorized: CategorizedData = {
    raw: [],
    internal: [],
    export: []
  };

  data.forEach((item) => {
    // Extract segment between s3a:// and trailing slash
    const match = item.location.match(/s3a:\/\/([^/]+)/);
    if (match && match[1]) {
      const segment = match[1].toLowerCase();

      if (segment.includes('internal')) {
        categorized.internal.push(item);
      } else if (segment.includes('raw')) {
        categorized.raw.push(item);
      } else if (segment.includes('export')) {
        categorized.export.push(item);
      }
    }
  });

  return categorized;
};

interface SectionProps {
  title: string;
  data: Array<{ name: string; location: string }>;
}

const extractLastPathSegment = (location: string): string => {
  const match = location.match(/\/([^/]+)$/);
  return match ? `/${match[1]}` : '';
};

const Section: React.FC<SectionProps> = ({ title, data }) => (
  <Box className="env-section">
    <Typography variant="h6" className="env-section-title">
      {title}
    </Typography>
    {data.length > 0 ? (
      <Box className="env-section-items">
        {data.map((item) => (
          <Box key={item.name} className="env-section-item">
            <Typography component="h3" className="env-section-item-title">
              {extractLastPathSegment(item.location)}
            </Typography>
            <Typography className="env-section-label">Name:</Typography>
            <Box className="env-section-value-box">
              <Typography className="env-section-value-name">
                {item.name}
              </Typography>
            </Box>
            <Typography className="env-section-label">S3 Path:</Typography>
            <Box className="env-section-value-box">
              <Typography className="env-section-value-path">
                {item.location}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    ) : (
      <Typography
        variant="body2"
        color="text.secondary"
        className="env-section-empty"
      >
        {`No ${title.toLowerCase()} schemas available`}
      </Typography>
    )}
  </Box>
);

const EnvironmentTab: React.FC<EnvironmentTabProps> = ({
  data,
  environment,
  isActive
}) => {
  const categorized = useMemo(() => {
    if (!data || data.length === 0) return null;
    return categorizeByLocation(data);
  }, [data]);

  if (!isActive) return null;

  if (!categorized) {
    return (
      <Box sx={{ p: 3 }}>
        <EmptyStateOverlay
          message={`No ${environment} environment data`}
          description={`There are no ${environment} schemas for this domain`}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Section title="RAW" data={categorized.raw} />
      <Section title="INTERNAL" data={categorized.internal} />
      <Section title="EXPORT" data={categorized.export} />
    </Box>
  );
};

export default EnvironmentTab;
