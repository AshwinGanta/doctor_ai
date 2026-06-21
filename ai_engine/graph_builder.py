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

# ---------------- Nodes ----------------

builder.add_node(
    "symptoms",
    symptom_node
)

builder.add_node(
    "analysis",
    analysis_node
)

builder.add_node(
    "emergency",
    emergency_node
)

builder.add_node(
    "treatment",
    treatment_node
)

# ---------------- Entry Point ----------------

builder.set_entry_point(
    "symptoms"
)

# ---------------- Flow ----------------

# Symptoms → Analysis

builder.add_edge(
    "symptoms",
    "analysis"
)

# ---------------- Conditional Routing ----------------

# Analysis → Emergency or Treatment

builder.add_conditional_edges(
    "analysis",
    route_severity,
    {
        "emergency": "emergency",
        "normal": "treatment"
    }
)

# ---------------- Ending ----------------

builder.add_edge(
    "emergency",
    END
)

builder.add_edge(
    "treatment",
    END
)

# ---------------- Compile ----------------

graph = builder.compile()