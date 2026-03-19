import React, { useMemo } from 'react';
import { Box, Typography } from '@weave-mui/material';
import EmptyStateOverlay from '../layout/EmptyStateOverlay';
import './StoragePage.css';

interface SnowflakeEnvironmentTabProps {
  data:
    | {
        schema?: {
          dev?: string[];
          stg?: string[];
          prd?: string[];
        };
        limited_schema?: {
          dev?: string[];
          stg?: string[];
          prd?: string[];
        };
      }
    | null
    | undefined;
  environment: string;
  isActive: boolean;
}

interface CategorizedData {
  shared: string[];
  private: string[];
  limited: string[];
}

const categorizeSchemas = (
  schemas: string[],
  limitedSchemas: string[]
): CategorizedData => {
  const categorized: CategorizedData = {
    shared: [],
    private: [],
    limited: []
  };

  // Categorize regular schemas
  schemas.forEach((schema) => {
    const lowerSchema = schema.toLowerCase();
    if (lowerSchema.includes('shared')) {
      categorized.shared.push(schema);
    } else if (lowerSchema.includes('private')) {
      categorized.private.push(schema);
    }
  });

  // Add limited schemas
  categorized.limited = limitedSchemas;

  return categorized;
};

interface SectionProps {
  title: string;
  data: string[];
}

const Section: React.FC<SectionProps> = ({ title, data }) => (
  <Box className="env-section">
    <Typography variant="h6" className="env-section-title">
      {title}
    </Typography>
    {data.length > 0 ? (
      <Box className="env-section-items">
        {data.map((schema) => (
          <Box key={schema} className="env-section-item">
            <Typography className="env-section-label">Schema:</Typography>
            <Box className="env-section-value-box">
              <Typography className="env-section-value-name">
                {schema}
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

const SnowflakeEnvironmentTab: React.FC<SnowflakeEnvironmentTabProps> = ({
  data,
  environment,
  isActive
}) => {
  const categorized = useMemo(() => {
    if (!data) return null;

    const env = environment.toLowerCase() as 'dev' | 'stg' | 'prd';
    const schemas = data.schema?.[env] || [];
    const limitedSchemas = data.limited_schema?.[env] || [];

    // If no data for this environment
    if (schemas.length === 0 && limitedSchemas.length === 0) {
      return null;
    }

    return categorizeSchemas(schemas, limitedSchemas);
  }, [data, environment]);

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
      <Section title="SHARED" data={categorized.shared} />
      <Section title="PRIVATE" data={categorized.private} />
      <Section title="LIMITED" data={categorized.limited} />
    </Box>
  );
};

export default SnowflakeEnvironmentTab;
