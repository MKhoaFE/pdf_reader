OCR Claim Form Project
This project extracts text content from scanned PDF forms (e.g., insurance claim forms) using:

Python to convert PDF to image(s)

React + Tesseract.js and Python to OCR the images
----------------------
Source project:
src/
├── App.jsx
├── App.css
├── pdf2img.py
├── output_images
├── src
    ├── assets
    ├── components/
        ├── HeaderComponents
        ├── footer.jsx
        ├── loading.jsx
        ├── orcResult.jsx
        ├── uploadPDF.jsx
    ├── orc/
        ├── tesseract.jsx
├── README.md     
---------------------
REQUIREMENTS:

Python (for PDF → image conversion)
    Python 3.10+
    pip packages:
    pdf2image
    External:
    Poppler (required for pdf2image on Windows)

React (for OCR processing)
    Node.js v16 or v18
    npm or yarn
    tesseract.js (client-side OCR engine)
    Mui


Installation:
1. pip install pdf2image
2. download poppler
https://github.com/oschwartz10612/poppler-windows/releases/ 
and copy the PATH to bin folder and paste to "POPPLER_PATH" like: POPPLER_PATH = r"C:\Users\<your_name>\poppler-24.08.0\Library\bin"
3. npm install
4. npm start

to convert PDF to images, run command:
5. python pdf2img.py 
the code will convert file "claimForm.pdf" to images at output_images folder
then go on website and upload all that images to convert to text and can download the file .txt of image after converted.





