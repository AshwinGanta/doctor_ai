from langgraph.graph import StateGraph, END
from .state import DoctorState

from .nodes import (
    symptom_node,
    analysis_node,
    followup_node,
    emergency_node,
    treatment_node,
    route_severity,
    severity_router_node
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
    "followup",
    followup_node
)

builder.add_node(
    "severity_router",
    severity_router_node
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

# Symptoms → Analysis

builder.add_edge(
    "symptoms",
    "analysis"
)

# Analysis → Severity Router

builder.add_edge(
    "analysis",
    "severity_router"
)

# ---------------- Severity Router ----------------

builder.add_conditional_edges(
    "severity_router",
    route_severity,
    {
        "emergency": "emergency",
        "normal": "treatment"
    }
)

# ---------------- Ending ----------------

builder.add_edge(
    "followup",
    END
)

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
