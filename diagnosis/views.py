from rest_framework.decorators import api_view
from rest_framework.response import Response

from ai_engine.graph_builder import graph
from ai_engine.nodes import hospital_node
from records.models import DiagnosisReport



@api_view(["POST"])
def analyze(request):

    symptoms = request.data.get("symptoms")

    result = graph.invoke(

        {
            "symptoms": symptoms
        }

    )
    report = DiagnosisReport.objects.create(

        symptoms=symptoms,

        condition=result["condition"],

        diagnosis=result["diagnosis"],

        specialist=result["specialist"],

        severity=result["severity"],

        urgency=result["urgency"],

        confidence=result["confidence"],

        first_aid=result["first_aid"],

        tests=result["tests"],

        medicines=result["medicines"],

        home_remedies=result["home_remedies"]

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
