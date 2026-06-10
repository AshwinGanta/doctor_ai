from dotenv import load_dotenv
import os
import requests
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

load_dotenv()

API_KEY = os.getenv("GEOAPIFY_API_KEY")


def find_nearby_hospitals(address, pincode, specialist):

    geolocator = Nominatim(user_agent="doctor_ai")

    query = f"{address}, {pincode}"

    location = geolocator.geocode(query)

    if location is None:
        print("Could not find location.")
        return []

    lat = location.latitude
    lon = location.longitude

    print("Latitude:", lat)
    print("Longitude:", lon)

    url = (
        "https://api.geoapify.com/v2/places"
        f"?categories=healthcare"
        f"&filter=circle:{lon},{lat},30000"
        f"&limit=50"
        f"&apiKey={API_KEY}"
    )

    response = requests.get(url)

    #print("Status code:", response.status_code)

    if response.status_code != 200:
        print(response.text)
        return []

    data = response.json()

    if "features" not in data:
        return []

   
    #print("Features found:", len(data["features"]))

    ignore_words = [

        "blood",
        "blood bank",

        "pharmacy",
        "chemist",
        "medical store",

        "laboratory",
        "lab",
        "labs",

        "diagnostic",
        "diagnostics",
        "diagnositic",

        "imaging",
        "scan",
        "xray",

        "medical shop",
        "medical shop",
        "medical stores",
        "fancy stores",
        "sub centre",
        "subcentre",
        "tent house"

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

        categories = properties.get(
            "categories",
            []
        )

        if "healthcare.pharmacy" in categories:
            continue

        name = properties.get(
            "name",
            "Unknown Hospital"
        )

        name_lower = name.lower()

        if name_lower in seen:
            continue

        seen.add(name_lower)

        if any(word in name_lower for word in ignore_words):
            continue

        hospital_lat = properties["lat"]
        hospital_lon = properties["lon"]

        distance = geodesic(
            (lat, lon),
            (hospital_lat, hospital_lon)
        ).km

        score = 0

        if "super speciality" in name_lower:
            score += 50

        if "superspeciality" in name_lower:
            score += 50

        if "multi speciality" in name_lower:
            score += 30

        if "multispeciality" in name_lower:
            score += 30

        score -= distance

        hospitals.append(
            (
                score,
                distance,
                name
            )
        )

    hospitals.sort(
        reverse=True
    )

    result = []

    for score, distance, name in hospitals:

        result.append(
            (
                distance,
                name
            )
        )

    #print("Hospitals found:", result[:10])

    return result[:10]
