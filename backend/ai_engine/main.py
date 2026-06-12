from backend.ai_engine.graph_builder import graph
from backend.ai_engine.nodes import hospital_node

print("Enter your symptoms:")
symptoms = input()

result = graph.invoke(
    {
        "symptoms": symptoms
    }
)

print("\n========== Diagnosis Report ==========\n")

print(f"Symptoms      : {result['symptoms']}")
print(f"Severity      : {result['severity']}")
print(f"Specialist    : {result['specialist']}")
print(f"Condition     : {result['condition']}")
print(f"Urgency       : {result['urgency']}")
print(f"First Aid     : {result['first_aid']}")
print(f"Tests         : {', '.join(result['tests'])}")
print(f"Diagnosis     : {result['diagnosis']}")
print(f"Confidence    : {result['confidence']}%")

if result.get("medicines"):

    print("\nMedicines:")

    for med in result["medicines"]:
        print("-", med)

if result.get("home_remedies"):

    print("\nHome Remedies:")

    for remedy in result["home_remedies"]:
        print("-", remedy)

if "advice" in result:

    print("\nAdvice:")
    print(result["advice"])

if "followup_question" in result:

    print("\nNeed More Information:")
    print(result["followup_question"])

if "emergency_message" in result:

    print("\n🚨 EMERGENCY")
    print(result["emergency_message"])

print("\n======================================")

# ---------------- Emergency Check ----------------

if (
    result["severity"].lower()
    in ["high", "severe", "critical"]

    or

    result["urgency"].lower()
    in ["emergency", "immediate", "urgent", "emergent"]
):

    print("\n🚨 EMERGENCY DETECTED")
    print("Nearby hospitals will be searched.")

    answer = "yes"

else:

    answer = input(
        "\nDo you want nearby hospitals? (yes/no): "
    ).lower()

# ---------------- Hospital Search ----------------

if answer == "yes":

    address = input(
        "\nEnter your address: "
    )

    pincode = input(
        "Enter your pincode: "
    )

    hospital_result = hospital_node(
        {
            "address": address,
            "pincode": pincode,
            "specialist": result["specialist"]
        }
    )

    if hospital_result["hospital_names"]:

        print("\nNearby Relevant Hospitals:\n")

        for name, distance in zip(
            hospital_result["hospital_names"],
            hospital_result["hospital_distances"]
        ):

            print(f"- {name}")
            print(f"  Distance : {distance} km\n")

    else:

        print("\nNo hospitals found nearby.")