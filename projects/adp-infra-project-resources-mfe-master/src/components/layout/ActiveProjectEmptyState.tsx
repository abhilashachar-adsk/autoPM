import React from 'react';
import { Typography, Box } from '@weave-mui/material';
import SelectProjectGif from '../../common/icons/select_project.gif';

const ActiveProjectEmptyState: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    py={6}
    width="100%"
    data-testid="active-project-empty-state"
  >
    <Typography
      variant="h3"
      color="text.primary"
      textAlign="center"
      sx={{ mb: '32px' }}
    >
      Please, select a project to continue:
    </Typography>
    <Box sx={{ maxWidth: '400px', width: '100%' }}>
      <img
        src={SelectProjectGif}
        alt="Select a project"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </Box>
  </Box>
);

export default ActiveProjectEmptyState;
