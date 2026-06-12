from rest_framework.decorators import api_view
from rest_framework.response import Response

from ai_engine.graph_builder import graph


@api_view(["POST"])
def analyze(request):

    symptoms = request.data["symptoms"]

    result = graph.invoke({

        "symptoms": symptoms

    })

    return Response(result)
