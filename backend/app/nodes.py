from .llm import llm
import json
from .medicine_db import medicine_db
from .hospital_finder import find_nearby_hospitals


def symptom_node(state):

    print("Symptoms received.")

    return {
        "symptoms": state["symptoms"]
    }


def analysis_node(state):

    prompt = f"""
You are an expert medical triage assistant.

Patient symptoms:

{state["symptoms"]}

Return ONLY valid JSON.

Do not explain.
Do not use markdown.
Do not use triple backticks.

Specialist must be the MOST APPROPRIATE medical specialist
that should be consulted for the patient's symptoms.

Examples:

Heart diseases → Cardiologist
Brain disorders → Neurologist
Bone injuries → Orthopedist
Skin diseases → Dermatologist
Eye problems → Ophthalmologist
Ear, nose and throat problems → ENT Specialist
Dental problems → Dentist
Mental health issues → Psychiatrist
Digestive problems → Gastroenterologist
Kidney problems → Nephrologist
Hormonal disorders → Endocrinologist

Always return the most suitable specialist.

Never return:
- Emergency Physician
- Physician

Format:

{{
"severity":"",
"specialist":"",
"condition":"",
"urgency":"",
"first_aid":"",
"tests":[],
"diagnosis":"",
"confidence":0
}}

Confidence must be an INTEGER between 0 and 100.

Chest pain + difficulty breathing -> 95
Severe leg pain + swelling + inability to move + deformity -> 95
Fever + cough -> 85
Headache -> 70
Leg pain -> 60
Feeling bad -> 30
Pain -> 20

Never return 0 unless there is absolutely no information.

Return only JSON.
"""

    try:

        response = llm.invoke(prompt)

        text = response.content
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        data = json.loads(text)

        confidence = float(data.get("confidence", 0))

        if confidence <= 1:
            confidence *= 100

        confidence = int(round(confidence))

        return {
            "severity": data.get("severity", "unknown"),
            "specialist": data.get("specialist", "Unknown"),
            "condition": data.get("condition", "Unknown"),
            "urgency": data.get("urgency", "unknown"),
            "first_aid": data.get("first_aid", ""),
            "tests": data.get("tests", []),
            "diagnosis": data.get("diagnosis", ""),
            "confidence": confidence,
            "medicines": data.get("medicines", []),
            "home_remedies": data.get("home_remedies", [])
        }

    except Exception as e:

        print("\nError:", e)

        return {
            "severity": "unknown",
            "specialist": "Unknown",
            "condition": "Unable to determine",
            "urgency": "unknown",
            "first_aid": "None",
            "tests": [],
            "diagnosis": "Could not analyze symptoms.",
            "confidence": 0,
            "medicines": [],
            "home_remedies": []
        }


def followup_node(state):

    return {
        "followup_question":
        "Please describe your symptoms in more detail."
    }


def emergency_node(state):

    return {
        "emergency_message":
        "Go to the nearest hospital or call emergency services immediately."
    }


def advice_node(state):

    return {
        "advice":
        "Follow doctor's instructions and monitor symptoms."
    }


def route_confidence(state):

    confidence = state.get("confidence", 0)

    severity = state.get("severity", "").lower()
    urgency = state.get("urgency", "").lower()

    if (
        severity in ["high", "severe", "critical"]
        or
        urgency in ["emergency", "immediate", "urgent", "emergent"]
    ):
        return "high"

    if confidence < 70:
        return "low"

    return "high"


def route_severity(state):

    urgency = state.get("urgency", "").lower()
    severity = state.get("severity", "").lower()

    emergency_urgencies = [
        "emergency",
        "immediate",
        "urgent",
        "emergent"
    ]

    emergency_severities = [
        "high",
        "severe",
        "critical"
    ]

    if urgency in emergency_urgencies or severity in emergency_severities:
        return "emergency"

    return "normal"


def severity_router_node(state):

    return {}


def specialist_router_node(state):

    return {}


def treatment_node(state):

    condition = state.get("condition", "").lower()

    medicines = []
    remedies = []

    for keyword, info in medicine_db.items():

        if keyword in condition:

            medicines = info["medicines"]
            remedies = info["home_remedies"]

            break

    return {
        "medicines": medicines,
        "home_remedies": remedies
    }


def hospital_node(state):

    print("Hospital node running...")

    address = state.get("address", "")
    pincode = state.get("pincode", "")
    specialist = state.get("specialist", "")

    hospitals = find_nearby_hospitals(
        address,
        pincode,
        specialist
    )

    if len(hospitals) == 0:

        return {
            "hospital_names": [],
            "hospital_distances": []
        }

    hospital_list = []

    for distance, name in hospitals:

        hospital_list.append(
            f"{name} ({round(distance, 2)} km)"
        )

    prompt = f"""
Patient requires a {specialist}.

Nearby hospitals:

{chr(10).join(hospital_list)}

Choose the THREE BEST hospitals.

Dentist:
Prefer dental hospitals and dental clinics.

Cardiologist:
Prefer heart hospitals and super speciality hospitals.

Neurologist:
Prefer neuro hospitals and super speciality hospitals.

Orthopedist:
Prefer orthopedic hospitals.

Dermatologist:
Prefer skin clinics and dermatology hospitals.

Ophthalmologist:
Prefer eye hospitals.

ENT Specialist:
Prefer ENT hospitals.

Psychiatrist:
Prefer mental health hospitals.

Avoid:

- Blood banks
- Labs
- Diagnostic centres
- Pharmacies
- Primary Health Centres
- Homeopathy clinics
- Ayurvedic hospitals
- Medical shops

Return ONLY JSON.

Format:

{{
"recommended_hospitals":[
"",
"",
""
]
}}
"""

    try:

        response = llm.invoke(prompt)

        text = response.content
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        data = json.loads(text)

        ranked_hospitals = data.get("recommended_hospitals", [])

    except Exception as e:

        print("Groq ranking error:", e)

        ranked_hospitals = [
            name
            for _, name in hospitals[:3]
        ]

    names = []
    distances = []

    for hospital_name in ranked_hospitals:

        for distance, name in hospitals:

            if hospital_name.lower() in name.lower():

                names.append(name)
                distances.append(round(distance, 2))

                break

    return {

        "hospital_names": names,

        "hospital_distances": distances

    }
