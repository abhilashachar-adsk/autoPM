import React from 'react';
import { AlertM } from '@weave-mui/icons-weave';
import { Typography, Box } from '@weave-mui/material';
import Illustration from '@weave-mui/illustration';

interface EmptyStateOverlayProps {
  message: string;
  description: string;
}

const EmptyStateOverlay: React.FC<EmptyStateOverlayProps> = ({
  message = 'No data available',
  description = ''
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    py={4}
    width="100%"
    data-testid="empty-state-overlay"
  >
    <Box sx={{ mb: 2 }}>
      <Illustration variant="no-data" />
    </Box>
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      data-testid="empty-state-alert"
    >
      {message && (
        <>
          <AlertM sx={{ marginRight: '8px', color: 'warning.main' }} />
          <Typography>{message}</Typography>
        </>
      )}
    </Box>
    {description && (
      <Typography variant="body2" color="text.secondary" mt={1}>
        {description}
      </Typography>
    )}
  </Box>
);

export default EmptyStateOverlay;
