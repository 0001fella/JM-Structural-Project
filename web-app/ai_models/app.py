from flask import Flask, request, jsonify
from dimension_extractor import DimensionExtractor
from material_recognizer import MaterialRecognizer
from cost_estimator import CostEstimator
from supplier_matcher import SupplierMatcher
from transport_estimator import TransportEstimator
from ocr_processor import OCRProcessor
from langchain_quotation_generator import QuotationGenerator

app = Flask(__name__)
dim_extractor = DimensionExtractor()
mat_recognizer = MaterialRecognizer()
cost_estimator = CostEstimator()
supp_matcher = SupplierMatcher()
trans_estimator = TransportEstimator()
ocr = OCRProcessor()
quotation_gen = QuotationGenerator()

@app.route('/analyze', methods=['POST'])
def analyze_design():
    file_path = request.json.get('file_path')

    if not file_path:
        return jsonify({"error": "No file path provided"}), 400

    try:
        dimensions = dim_extractor.extract(file_path)
        material_info = mat_recognizer.recognize(file_path)
        cost_info = cost_estimator.estimate_cost(dimensions, material_info["material"])
        suppliers = supp_matcher.get_suppliers(material_info["material"])
        ocr_text = ocr.extract_text(file_path)
        quotation = quotation_gen.generate(cost_info)

        return jsonify({
            "dimensions": dimensions,
            "recognized_material": material_info,
            "cost_estimate": cost_info,
            "suppliers": suppliers,
            "ocr_text": ocr_text,
            "quotation": quotation
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)