import json
import os

class CostEstimator:
    def __init__(self):
        qos_file = os.path.join(os.path.dirname(__file__), 'data', 'kenya_qos_manual.json')
        with open(qos_file, 'r') as f:
            self.qos_data = json.load(f)

    def estimate_cost(self, dimensions, material):
        unit_price = self.qos_data.get(material, {}).get("unit_price", 1000)
        quantity = sum(float(d['value'].replace('m', '')) for d in dimensions)
        total_cost = quantity * unit_price
        return {
            "material": material,
            "quantity": quantity,
            "unit_price": unit_price,
            "total_cost": total_cost
        }