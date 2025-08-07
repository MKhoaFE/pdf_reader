import React from 'react';
import { CircularProgress, LinearProgress, Box, Typography } from '@mui/material';

const Loading = ({ progress }) => {
  return (
    <Box textAlign="center" my={3}>
      <Typography variant="body1" gutterBottom>
        Processing OCR...
      </Typography>
      <Box width="100%" maxWidth="400px" mx="auto">
        <LinearProgress variant="determinate" value={progress * 100} />
        <Typography variant="caption">{Math.round(progress * 100)}%</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
