from rest_framework.decorators import api_view
from rest_framework.response import Response

from ai_engine.graph_builder import graph
from ai_engine.nodes import hospital_node


@api_view(["POST"])
def analyze(request):

    symptoms = request.data.get("symptoms")

    result = graph.invoke(

        {
            "symptoms": symptoms
        }

    )

    return Response(result)


@api_view(["POST"])
def hospitals(request):

    address = request.data.get("address")
    pincode = request.data.get("pincode")
    specialist = request.data.get("specialist")

    result = hospital_node(

        {

            "address": address,
            "pincode": pincode,
            "specialist": specialist

        }

    )

    return Response(result)