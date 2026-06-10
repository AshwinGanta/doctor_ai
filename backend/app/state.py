from typing import TypedDict


class DoctorState(TypedDict):

    symptoms: str

    severity: str
    specialist: str
    condition: str
    urgency: str
    first_aid: str
    tests: list
    diagnosis: str

    confidence: int

    emergency_message: str
    advice: str

    followup_question: str

    medicines: list
    home_remedies: list

    # User location
    address: str
    pincode: str

    # Hospital info
    hospital_names: list
    hospital_distances: list
