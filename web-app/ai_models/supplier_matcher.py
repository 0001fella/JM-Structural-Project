class SupplierMatcher:
    def __init__(self):
        self.suppliers = {
            "cement": ["Bamburi Cement", "Kenya Portland Cement"],
            "steel": ["Tristar Steel", "Metals Kenya"],
            "sand": ["Nairobi Sand Co.", "Mombasa Aggregate Suppliers"]
        }

    def get_suppliers(self, material):
        return self.suppliers.get(material.lower(), ["Local Supplier"])