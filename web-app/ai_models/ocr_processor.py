import easyocr

class OCRProcessor:
    def __init__(self):
        self.reader = easyocr.Reader(['en'])

    def extract_text(self, image_path):
        result = self.reader.readtext(image_path)
        return [text for (_, text, _) in result]