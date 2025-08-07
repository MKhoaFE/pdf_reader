// import React from 'react';
// import { Button, Typography } from '@mui/material';

// function UploadPDF({ onFileSelect }) {
//   const handleChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       onFileSelect(file);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h6">Chọn file PDF hoặc ảnh:</Typography>
//       <input
//         type="file"
//         accept="application/pdf,image/*"
//         onChange={handleChange}
//         style={{ marginTop: '10px' }}
//       />
//     </div>
//   );
// }

// export default UploadPDF;

// components/uploadPDF.jsx
import React, { useState } from 'react';
import { runOCR } from '../ocr/tesseract';

const UploadPDF = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOCR = async () => {
    if (!image) return;
    setLoading(true);
    const result = await runOCR(image);
    setText(result);
    setLoading(false);

    // Tùy chọn: Lưu text ra file .txt
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ocr-result.txt';
    link.click();
  };

  return (
    <div>
      <h2>Upload Insurance Document</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleOCR} disabled={loading || !image}>
        {loading ? 'Processing...' : 'Run OCR'}
      </button>

      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadPDF;
