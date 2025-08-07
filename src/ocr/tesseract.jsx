import { createWorker } from 'tesseract.js';

export const runOCR = async (image) => {
  const worker = await createWorker('eng'); // hỗ trợ tiếng Anh

  try {
    const { data: { text } } = await worker.recognize(image);
    await worker.terminate();
    return text;
  } catch (err) {
    console.error('OCR Error:', err);
    await worker.terminate();
    return null;
  }
};
