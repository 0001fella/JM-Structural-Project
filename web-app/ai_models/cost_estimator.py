from .material_calculator import calculate_materials

def estimate_cost(dimensions, region='us-east'):
    """Generate cost estimate based on dimensions"""
    materials = calculate_materials(dimensions, region)
    
    # Material costs
    material_costs = {
        'Concrete': 120,  # per m³
        'Bricks': 0.75,   # per unit
        'Steel': 2.5,     # per kg
        'Glass': 45       # per m²
    }
    
    # Calculate total material cost
    total_cost = sum(
        mat['quantity'] * material_costs.get(mat['name'], 0)
        for mat in materials
    )
    
    # Add labor costs (30% of material costs)
    total_cost *= 1.3
    
    return {
        'materials': materials,
        'total_cost': total_cost,
        'region': region
    }