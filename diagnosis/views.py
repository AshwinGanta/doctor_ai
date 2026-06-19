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
        condition=result.get("condition", ""),
        diagnosis=result.get("diagnosis", ""),
        specialist=result.get("specialist", ""),
        severity=result.get("severity", ""),
        urgency=result.get("urgency", ""),
        confidence=result.get("confidence", 0),
        first_aid=result.get("first_aid", ""),
        tests=result.get("tests", []),
        medicines=result.get("medicines", []),
        home_remedies=result.get("home_remedies", [])
    )

    result["report_id"] = report.id

    return Response(result)


@api_view(["POST"])
def hospitals(request):

    address = request.data.get("address")
    pincode = request.data.get("pincode")
    specialist = request.data.get("specialist")
    report_id = request.data.get("report_id")

    print("Hospital node running...")

    result = hospital_node(
        {
            "address": address,
            "pincode": pincode,
            "specialist": specialist
        }
    )
    print(result)

    if report_id:
        try:
            report = DiagnosisReport.objects.get(id=report_id)

            report.address = address
            report.pincode = pincode
            report.hospital_names = result.get("hospital_names", [])

            report.save()

        except DiagnosisReport.DoesNotExist:
            print("Report not found")

    return Response(result)