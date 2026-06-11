import { useState } from "react";
import {
    Search,
    HeartPulse,
    Activity,
    Stethoscope,
    Brain,
    AlarmClock,
    ShieldCheck,
    Syringe,
    TestTube,
    Pill,
    Leaf,
    MapPin
} from "lucide-react";

import { API } from "../services/api";

function InputBox() {

    const [address, setAddress] = useState("");
    const [showAddressBox, setShowAddressBox] = useState(false);
    const [hospitals, setHospitals] = useState([]);
    const [symptoms, setSymptoms] = useState("");
    const [result, setResult] = useState(null);

    async function analyzeSymptoms() {

        try {

            const response = await API.post("/analyze", {
                symptoms: symptoms
            });

            setResult(response.data);

        }

        catch (error) {

            console.log(error);
            alert("Failed to analyze symptoms");

        }

    }
    async function findHospitals() {

        try {

            const response = await API.post(
                "/hospitals",
                {
                    address: address
                }
            );

            setHospitals(response.data.hospitals);

        }

        catch (error) {

            console.log(error);

        }

    }

    function getSeverityBadge() {

        if (!result) return null;

        const severity = result.severity.toLowerCase();

        if (severity === "high") {

            return (
                <div className="
                inline-block
                px-5
                py-2
                rounded-full
                bg-red-500/20
                text-red-400
                font-bold
                shadow-lg shadow-red-500/30">

                    HIGH

                </div>
            );

        }

        if (severity === "moderate") {

            return (
                <div className="
                inline-block
                px-5
                py-2
                rounded-full
                bg-yellow-500/20
                text-yellow-300
                font-bold
                shadow-lg shadow-yellow-500/30">

                    MODERATE

                </div>
            );

        }

        return (

            <div className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-green-500/20
            text-green-400
            font-bold
            shadow-lg shadow-green-500/30">

                LOW

            </div>

        );

    }

    return (

        <div className={`
        backdrop-blur-3xl
        p-10
        rounded-[40px]
        shadow-2xl
        w-[700px]

        ${result?.severity?.toLowerCase() === "high"
                ? "bg-red-500/10 border border-red-500 shadow-red-500/30"
                : "bg-white/10"
            }
        `}>

            {

                result?.severity?.toLowerCase() === "high" &&

                <div className="
                mb-8
                bg-red-500/20
                border
                border-red-500
                rounded-3xl
                p-5
                text-red-300
                font-bold
                text-center
                animate-pulse">

                    ⚠ EMERGENCY DETECTED
                    <br />
                    Seek Immediate Medical Attention

                </div>

            }

            <h1 className={`
            text-6xl
            font-bold
            text-center

            ${result?.severity?.toLowerCase() === "high"
                    ? "text-red-400"
                    : "text-white"
                }`}>

                Doctor AI

            </h1>

            <p className="text-gray-400 text-center mt-3">
                AI Powered Medical Assistant
            </p>

            <div className="flex mt-10 gap-4">

                <input
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="
                    flex-1
                    rounded-3xl
                    bg-white/10
                    p-5
                    text-white
                    outline-none
                    text-xl"
                    placeholder="Describe your symptoms..."
                />

                <button
                    onClick={analyzeSymptoms}
                    className="
                    bg-blue-500
                    hover:bg-blue-600
                    hover:scale-105
                    duration-300
                    rounded-3xl
                    px-8
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg shadow-blue-500/30">

                    <Search />

                </button>

            </div>


            {

                result &&

                <div className="mt-10 space-y-6">

                    {/* Condition */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <HeartPulse className="text-pink-400" />
                            <h2 className="text-gray-400 text-xl">
                                Condition
                            </h2>
                        </div>

                        <p className="text-3xl text-white">
                            {result.condition}
                        </p>

                    </div>


                    {/* Severity */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <Activity className="text-yellow-400" />
                            <h2 className="text-gray-400 text-xl">
                                Severity
                            </h2>
                        </div>

                        {getSeverityBadge()}

                    </div>


                    {/* Specialist */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <Stethoscope className="text-cyan-400" />
                            <h2 className="text-gray-400 text-xl">
                                Specialist
                            </h2>
                        </div>

                        <p className="text-3xl text-white">
                            {result.specialist}
                        </p>

                    </div>


                    {/* Diagnosis */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <Brain className="text-purple-400" />
                            <h2 className="text-gray-400 text-xl">
                                Diagnosis
                            </h2>
                        </div>

                        <p className="text-2xl text-white">
                            {result.diagnosis}
                        </p>

                    </div>


                    {/* Urgency */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <AlarmClock className="text-orange-400" />
                            <h2 className="text-gray-400 text-xl">
                                Urgency
                            </h2>
                        </div>

                        <p className="text-2xl text-white">
                            {result.urgency}
                        </p>

                    </div>


                    {/* Confidence */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="text-green-400" />
                            <h2 className="text-gray-400 text-xl">
                                Confidence
                            </h2>
                        </div>

                        <p className="text-2xl text-white">
                            {result.confidence}%
                        </p>

                    </div>


                    {/* First Aid */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">
                            <Syringe className="text-red-300" />
                            <h2 className="text-gray-400 text-xl">
                                First Aid
                            </h2>
                        </div>

                        <p className="text-2xl text-white">
                            {result.first_aid}
                        </p>

                    </div>


                    {/* Tests */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-4">
                            <TestTube className="text-blue-400" />
                            <h2 className="text-gray-400 text-xl">
                                Recommended Tests
                            </h2>
                        </div>

                        {
                            result.tests?.map((test, index) => (

                                <p
                                    key={index}
                                    className="text-white text-xl mb-2">

                                    🧪 {test}

                                </p>

                            ))
                        }

                    </div>


                    {/* Medicines */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-4">
                            <Pill className="text-pink-400" />
                            <h2 className="text-gray-400 text-xl">
                                Medicines
                            </h2>
                        </div>

                        {
                            result.medicines?.map((medicine, index) => (

                                <p
                                    key={index}
                                    className="text-white text-xl mb-2">

                                    💊 {medicine}

                                </p>

                            ))
                        }

                    </div>


                    {/* Home Remedies */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-4">
                            <Leaf className="text-green-400" />
                            <h2 className="text-gray-400 text-xl">
                                Home Remedies
                            </h2>
                        </div>

                        {
                            result.home_remedies?.map((item, index) => (

                                <p
                                    key={index}
                                    className="text-white text-xl mb-2">

                                    🌿 {item}

                                </p>

                            ))
                        }

                    </div>


                    {/* Nearby Hospitals */}

                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-4">

                            <MapPin className="text-red-400" />

                            <h2 className="text-gray-400 text-xl">

                                Nearby Hospitals

                            </h2>

                        </div>

                        {

                            result.severity.toLowerCase() === "high"

                                ?

                                (

                                    <>

                                        <p className="text-red-300 mb-5">

                                            Emergency detected.
                                            Please enter your address.

                                        </p>

                                        <input

                                            value={address}

                                            onChange={(e) => setAddress(e.target.value)}

                                            placeholder="Enter your address..."

                                            className="
                    w-full
                    p-5
                    rounded-3xl
                    bg-white/10
                    text-white
                    outline-none
                    "

                                        />

                                        <button

                                            onClick={findHospitals}

                                            className="
                    mt-5
                    bg-blue-500
                    px-6
                    py-3
                    rounded-3xl
                    text-white
                    "

                                        >

                                            Find Hospitals

                                        </button>

                                    </>

                                )

                                :

                                (

                                    <>

                                        <p className="text-white mb-5">

                                            Do you want nearby hospitals?

                                        </p>

                                        <div className="flex gap-5">

                                            <button

                                                onClick={() => setShowAddressBox(true)}

                                                className="
                        bg-green-500
                        px-6
                        py-3
                        rounded-3xl
                        text-white
                        "

                                            >

                                                YES

                                            </button>

                                            <button

                                                onClick={() => setShowAddressBox(false)}

                                                className="
                        bg-red-500
                        px-6
                        py-3
                        rounded-3xl
                        text-white
                        "

                                            >

                                                NO

                                            </button>

                                        </div>

                                        {

                                            showAddressBox &&

                                            <>

                                                <input

                                                    value={address}

                                                    onChange={(e) => setAddress(e.target.value)}

                                                    placeholder="Enter your address..."

                                                    className="
                            mt-5
                            w-full
                            p-5
                            rounded-3xl
                            bg-white/10
                            text-white
                            outline-none
                            "

                                                />

                                                <button

                                                    onClick={findHospitals}

                                                    className="
                            mt-5
                            bg-blue-500
                            px-6
                            py-3
                            rounded-3xl
                            text-white
                            "

                                                >

                                                    Find Hospitals

                                                </button>

                                            </>

                                        }

                                    </>

                                )

                        }

                    </div>
                    {

                        hospitals.map((hospital, index) => (

                            <div

                                key={index}

                                className="bg-white/10 p-6 rounded-3xl"

                            >

                                <h2 className="text-2xl text-white">

                                    🏥 {hospital.name}

                                </h2>

                                <p className="text-gray-400 mt-3">

                                    📍 {hospital.distance} km away

                                </p>

                            </div>

                        ))

                    }
                </div>

            }

        </div>

    );

}

export default InputBox;