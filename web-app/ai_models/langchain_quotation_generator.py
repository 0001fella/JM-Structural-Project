from langchain.prompts import PromptTemplate
from langchain.llms import LlamaCpp

class QuotationGenerator:
    def __init__(self, model_path="data/models/llama3-8b.gguf"):
        self.llm = LlamaCpp(model_path=model_path)

    def generate(self, data):
        prompt = PromptTemplate.from_template(
            "Generate a professional quotation for a construction project based on:\n\n"
            "Material: {material}\nQuantity: {quantity}\nUnit Price: {unit_price}\n"
            "Total Cost: {total_cost}\nSuppliers: {suppliers}\n"
            "Write a clear, detailed, and editable quotation."
        )
        formatted_prompt = prompt.format(**data)
        response = self.llm(prompt=formatted_prompt)
        return response