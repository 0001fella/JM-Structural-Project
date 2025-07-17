from transformers import CLIPProcessor, CLIPModel
import torch
from PIL import Image

class MaterialRecognizer:
    def __init__(self):
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    def recognize(self, image_path, possible_materials=["concrete", "steel", "brick", "wood"]):
        image = Image.open(image_path).convert("RGB")
        inputs = self.processor(text=possible_materials, images=image, return_tensors="pt", padding=True)

        with torch.no_grad():
            outputs = self.model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)

        best_idx = probs.argmax().item()
        return {
            "material": possible_materials[best_idx],
            "confidence": probs[0][best_idx].item()
        }