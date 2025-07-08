def calculate_materials(dimensions, region='us-east'):
    """Calculate materials based on dimensions and region"""
    # Material calculation logic
    materials = []
    
    # Calculate concrete for foundations
    total_length = sum(wall['length'] for wall in dimensions['walls'])
    materials.append({
        'name': 'Concrete',
        'quantity': total_length * 0.3,
        'unit': 'm³'
    })
    
    # Calculate bricks for walls
    wall_area = sum(wall['length'] * wall['height'] for wall in dimensions['walls'])
    materials.append({
        'name': 'Bricks',
        'quantity': wall_area * 60,  # 60 bricks per m²
        'unit': 'units'
    })
    
    # Apply regional adjustments
    region_factors = {
        'us-east': 1.0,
        'us-west': 1.15,
        'eu': 1.2,
        'asia': 0.9
    }
    factor = region_factors.get(region, 1.0)
    
    return [{
        **mat, 
        'quantity': mat['quantity'] * factor
    } for mat in materials]