import { CircularProgress, Box } from '@weave-mui/material';
import React from 'react';

const LoadingOverlay: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="20vh">
    <CircularProgress variant="indeterminate" />
  </Box>
);

export default LoadingOverlay;
