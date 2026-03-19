import React from 'react';
import { Box, Container, Typography } from '@weave-mui/material';
import { typographyVariants } from '@weave-mui/enums';

const OrchestrationPage = () => (
  <Container sx={{ py: 4 }}>
    <Typography
      variant={typographyVariants.H3_BOLD}
      data-testid="orchestration-page-title"
    >
      Orchestration Management
    </Typography>
    <Box sx={{ mt: 4 }}>
      <Typography variant={typographyVariants.BODY_REGULAR}>
        Orchestration page content coming soon...
      </Typography>
    </Box>
  </Container>
);

export default OrchestrationPage;
