import React from 'react';
import { Typography } from '@mui/material';

function OCRResult({ text }) {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6">Kết quả OCR:</Typography>
      <Typography variant="body1" style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
        {text}
      </Typography>
    </div>
  );
}

export default OCRResult;
