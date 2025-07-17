import googlemaps

class TransportEstimator:
    def __init__(self, api_key="YOUR_GOOGLE_MAPS_API_KEY"):
        self.gmaps = googlemaps.Client(key=api_key)

    def estimate(self, origin, destination, weight_tonnes):
        directions_result = self.gmaps.directions(origin, destination)
        distance_km = directions_result[0]['legs'][0]['distance']['value'] / 1000
        rate_per_km = 150
        cost = distance_km * rate_per_km * weight_tonnes
        return {
            "origin": origin,
            "destination": destination,
            "distance_km": distance_km,
            "estimated_cost_kes": cost
        }