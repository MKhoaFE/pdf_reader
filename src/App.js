import React, { useState } from 'react';
import './App.css';
import { Container, Typography, Box, Paper } from '@mui/material';
import UploadPDF from './components/uploadPDF';
import OCRResult from './components/ocrResult';
import Loading from './components/loading';
import Header from './components/HeaderComponent/header';

import { runOCR } from './ocr/tesseract';

function App() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressInfo, setProgressInfo] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setLoading(true);
    setOcrText('');
    setProgressInfo({ page: 0, total: 0, progress: 0 });

    try {
      const text = await runOCR(selectedFile, (info) => {
        setProgressInfo(info);
      });
      setOcrText(text);
    } catch (err) {
      console.error('OCR failed:', err);
      setOcrText('OCR processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="">
      <Box my={4}>
        <Header />

        <Paper elevation={3} className="app-section">
          <UploadPDF onFileSelect={handleFileSelect} />
        </Paper>

        {loading && progressInfo && <Loading progressInfo={progressInfo} />}

        {!loading && ocrText && (
          <Paper elevation={3} className="app-section">
            <OCRResult text={ocrText} />
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default App;
