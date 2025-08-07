// import Tesseract from 'tesseract.js';
// import * as pdfjsLib from 'pdfjs-dist';

// // Cấu hình worker cho pdfjs
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// export async function runOCR(file, onProgress = () => {}) {
//   const fileType = file.type;

//   // Xử lý nếu là ảnh
//   if (fileType.startsWith('image/')) {
//     return await processImage(file, onProgress);
//   }

//   // Xử lý nếu là PDF
//   if (fileType === 'application/pdf') {
//     const pdfText = await processPDF(file, onProgress);
//     return pdfText;
//   }

//   throw new Error('Unsupported file type');
// }

// async function processImage(file, onProgress) {
//   const { data: { text } } = await Tesseract.recognize(file, 'eng', {
//     logger: onProgress
//   });
//   return text;
// }

// async function processPDF(file, onProgress) {
//   const buffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

//   let finalText = '';

//   for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//     const page = await pdf.getPage(pageNum);
//     const viewport = page.getViewport({ scale: 2 }); // scale để tăng chất lượng ảnh

//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     canvas.width = viewport.width;
//     canvas.height = viewport.height;

//     await page.render({ canvasContext: context, viewport }).promise;

//     const dataUrl = canvas.toDataURL('image/png');

//     const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng', {
//       logger: onProgress
//     });

//     finalText += `\n--- Page ${pageNum} ---\n${text}`;
//   }

//   return finalText;
// }

// ocr/tesseract.jsx
import { createWorker } from 'tesseract.js';

export const runOCR = async (image) => {
  const worker = await createWorker({
    langPath: '../../../public/tessdata',  // Đường dẫn đến thư mục chứa các .traineddata
    logger: m => console.log(m), // (Tùy chọn) để hiển thị tiến trình OCR
  });

  try {
    await worker.loadLanguage('eng+chi_tra');
    await worker.initialize('eng+chi_tra');

    const { data: { text } } = await worker.recognize(image);
    await worker.terminate();
    return text;
  } catch (err) {
    console.error('OCR Error:', err);
    await worker.terminate();
    return null;
  }
};
