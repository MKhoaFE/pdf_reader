from pdf2image import convert_from_path
import os

# Đường dẫn tới Poppler
POPPLER_PATH = r"C:\Users\minh khoa\Desktop\poppler-24.08.0\Library\bin"

def convert_pdf_to_images(pdf_path, output_folder="output_images"):
    print("[+] Đang chuyển PDF sang ảnh...")

    # Tạo thư mục output nếu chưa có
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Chuyển đổi PDF sang ảnh
    images = convert_from_path(pdf_path, dpi=300, poppler_path=POPPLER_PATH)

    # Lưu từng ảnh ra file PNG
    image_paths = []
    for i, img in enumerate(images):
        filename = os.path.join(output_folder, f"page_{i+1}.png")
        img.save(filename, "PNG")
        image_paths.append(filename)
        print(f"[✓] Lưu ảnh: {filename}")

    print("[✓] Chuyển đổi hoàn tất!")
    return image_paths

# Ví dụ chạy
if __name__ == "__main__":
    input_pdf = "claimForm.pdf"  # Thay bằng tên file PDF của bạn
    convert_pdf_to_images(input_pdf)
