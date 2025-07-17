from pdf2image import convert_from_path

def pdf_to_images(pdf_path, output_folder):
    images = convert_from_path(pdf_path)
    page_paths = []
    for i, image in enumerate(images):
        page_path = f"{output_folder}/page_{i}.jpg"
        image.save(page_path, "JPEG")
        page_paths.append(page_path)
    return page_paths