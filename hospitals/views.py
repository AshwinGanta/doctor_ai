from rest_framework.decorators import api_view
from rest_framework.response import Response

from ai_engine.hospital_finder import find_nearby_hospitals


@api_view(["POST"])
def get_hospitals(request):

    address = request.data.get("address")
    pincode = request.data.get("pincode")
    specialist = request.data.get("specialist")

    hospitals = find_nearby_hospitals(
        address,
        pincode,
        specialist
    )

    return Response(
        {
            "hospitals": hospitals
        }
    )