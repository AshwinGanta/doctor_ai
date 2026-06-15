from dotenv import load_dotenv
import os
import requests
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

# Load environment variables
load_dotenv()

API_KEY = os.getenv("GEOAPIFY_API_KEY")


def find_nearby_hospitals(address, pincode, specialist=None):
    geolocator = Nominatim(user_agent="doctor_ai")

    # Try different location queries
    queries = [
        f"{address}, {pincode}, India",
        f"{address}, India",
        f"{pincode}, India"
    ]

    location = None

    for query in queries:
        print("Trying:", query)
        location = geolocator.geocode(query, timeout=10)

        if location is not None:
            break

    if location is None:
        print("Could not find location.")
        return []

    lat = location.latitude
    lon = location.longitude

    print("Latitude:", lat)
    print("Longitude:", lon)

    # Geoapify API request
    url = (
        "https://api.geoapify.com/v2/places"
        f"?categories=healthcare"
        f"&filter=circle:{lon},{lat},30000"
        f"&limit=50"
        f"&apiKey={API_KEY}"
    )

    response = requests.get(url)

    if response.status_code != 200:
        print(response.text)
        return []

    data = response.json()

    if "features" not in data:
        return []

    # Words to ignore
    ignore_words = [
        "blood",
        "blood bank",

        "pharmacy",
        "chemist",
        "medical store",
        "medical shop",
        "medical stores",

        "laboratory",
        "lab",
        "labs",

        "diagnostic",
        "diagnostics",
        "diagnositic",

        "imaging",
        "scan",
        "xray",

        "fancy stores",
        "sub centre",
        "subcentre",
        "tent house",

        "fertility",

        "maternity",
        "mother",
        "child",

        "homeo",
        "homeopathy",

        "physiotherapy",
        "physio",

        "ayush",

        "phc",
        "primary health centre",

        "ayurveda",
        "chikitsa"
    ]

    hospitals = []
    seen = set()

    for hospital in data["features"]:
        properties = hospital["properties"]

        categories = properties.get("categories", [])

        # Skip pharmacies
        if "healthcare.pharmacy" in categories:
            continue

        name = properties.get("name", "Unknown Hospital")
        name_lower = name.lower()

        # Remove duplicates
        if name_lower in seen:
            continue

        seen.add(name_lower)

        # Ignore unwanted places
        if any(word in name_lower for word in ignore_words):
            continue

        hospital_lat = properties["lat"]
        hospital_lon = properties["lon"]

        distance = geodesic(
            (lat, lon),
            (hospital_lat, hospital_lon)
        ).km

        score = 0

        # Give preference to better hospitals
        if "super speciality" in name_lower:
            score += 50

        if "superspeciality" in name_lower:
            score += 50

        if "multi speciality" in name_lower:
            score += 30

        if "multispeciality" in name_lower:
            score += 30

        # Closer hospitals get higher score
        score -= distance

        hospitals.append(
            (
                score,
                distance,
                name
            )
        )

    # Sort by score
    hospitals.sort(reverse=True)

    result = []

    for score, distance, name in hospitals:

        result.append(
            (
                round(distance, 2),
                name
            )
        )

    # Sort by distance
    result.sort()

    return result[:10]
