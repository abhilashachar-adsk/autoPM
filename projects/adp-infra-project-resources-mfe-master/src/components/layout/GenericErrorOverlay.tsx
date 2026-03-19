import React from 'react';
import { Box, Typography } from '@weave-mui/material';

interface GenericErrorOverlayProps {
  errorMessage: string;
}

const GenericErrorOverlay: React.FC<GenericErrorOverlayProps> = ({
  errorMessage = 'An unexpected error occurred'
}) => {
  const content = (
    <>
      <Typography variant="h2">Oops! Something went wrong...</Typography>
      {errorMessage && (
        <Typography variant="h6" color="error" sx={{ mt: 2 }}>
          {`Error: ${errorMessage}`}
        </Typography>
      )}
    </>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20vh'
      }}
    >
      {content}
    </Box>
  );
};

export default GenericErrorOverlay;
