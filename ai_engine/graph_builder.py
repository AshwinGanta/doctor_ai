from langgraph.graph import StateGraph, END
from .state import DoctorState

from .nodes import (
    symptom_node,
    analysis_node,
    emergency_node,
    treatment_node,
    route_severity
)

builder = StateGraph(DoctorState)

builder.add_node("symptoms", symptom_node)
builder.add_node("analysis", analysis_node)
builder.add_node("emergency", emergency_node)
builder.add_node("treatment", treatment_node)

builder.set_entry_point("symptoms")

builder.add_edge(
    "symptoms",
    "analysis"
)

builder.add_conditional_edges(
    "analysis",
    route_severity,
    {
        "emergency": "emergency",
        "normal": "treatment"
    }
)

builder.add_edge(
    "emergency",
    END
)

builder.add_edge(
    "treatment",
    END
)

graph = builder.compile()