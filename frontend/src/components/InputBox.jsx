import { useState } from "react";
import {
    Search,
    HeartPulse,
    Activity,
    Stethoscope,
    Brain
} from "lucide-react";

import { API } from "../services/api";

import LoadingScreen from "./LoadingScreen";
import ResultCard from "./ResultCard";
import SeverityBadge from "./SeverityBadge";
import UrgencyCard from "./UrgencyCard";
import ConfidenceCard from "./ConfidenceCard";
import FirstAidCard from "./FirstAidCard";
import TestCard from "./TestCard";
import MedicineCard from "./MedicineCard";
import HomeRemedyCard from "./HomeRemedyCard";

function InputBox() {

    const [symptoms, setSymptoms] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showHospitalQuestion, setShowHospitalQuestion] = useState(false);
    const [showAddressInput, setShowAddressInput] = useState(false);

    async function analyzeSymptoms() {

        try {

            setLoading(true);

            const response = await API.post(
                "/analyze/",
                {
                    symptoms: symptoms
                }
            );

            setResult(response.data);
            if (response.data.severity.toLowerCase() === "high") {

                setShowAddressInput(true);

            }

            else {

                setShowHospitalQuestion(true);

            }

        }

        catch (error) {

            console.log(error);

            alert("Failed to analyze symptoms");

        }

        finally {

            setLoading(false);

        }

    }

    const isEmergency =
        result?.severity?.toLowerCase() === "high" ||
        result?.emergency_message;

    return (

        <div
            className={`
                backdrop-blur-3xl
                p-10
                rounded-[40px]
                shadow-2xl
                w-[700px]
                duration-700
                transition-all

                ${isEmergency
                    ? "bg-red-500/10 border border-red-500 shadow-red-500/30"
                    : "bg-white/10 border border-transparent"
                }
            `}
        >

            {

                isEmergency &&

                <div
                    className="
                    mb-8
                    bg-red-500/20
                    border
                    border-red-500
                    rounded-3xl
                    p-5
                    text-red-300
                    font-bold
                    text-center
                    animate-pulse
                "
                >

                    ⚠ EMERGENCY DETECTED

                    <br />

                    Seek Immediate Medical Attention

                    {

                        result?.emergency_message &&

                        <>
                            <br />

                            <span className="
                            text-sm
                            font-normal
                            text-red-200
                            mt-2
                            block
                            ">

                                {result.emergency_message}

                            </span>

                        </>

                    }

                </div>

            }

            <h1
                className={`
                    text-6xl
                    font-bold
                    text-center
                    duration-700

                    ${isEmergency
                        ? "text-red-400"
                        : "text-white"
                    }
                `}
            >

                Doctor AI

            </h1>

            <p className="text-gray-400 text-center mt-3">

                AI Powered Medical Assistant

            </p>

            <div className="flex mt-10 gap-4">

                <input

                    value={symptoms}

                    onChange={(e) => setSymptoms(e.target.value)}

                    placeholder="Describe your symptoms..."

                    className="
                        flex-1
                        rounded-3xl
                        bg-white/10
                        p-5
                        text-white
                        outline-none
                        text-xl
                        placeholder-gray-400
                        focus:bg-white/20
                    "

                />

                <button

                    onClick={analyzeSymptoms}

                    disabled={loading}

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
                        shadow-lg
                        shadow-blue-500/30
                        disabled:opacity-50
                        disabled:hover:scale-100
                    "

                >

                    <Search className="w-6 h-6" />

                </button>

            </div>

            {

                loading &&

                <LoadingScreen />

            }

            {

                result && !loading &&

                <div className="mt-10 space-y-6">

                    <ResultCard
                        condition={result.condition}
                        specialist={result.specialist}
                        diagnosis={result.diagnosis}
                    />

                    <SeverityBadge
                        severity={result.severity}
                    />

                    {

                        result.urgency &&

                        <UrgencyCard
                            urgency={result.urgency}
                        />

                    }

                    {

                        result.confidence &&

                        <ConfidenceCard
                            confidence={result.confidence}
                        />

                    }

                    {

                        result.first_aid &&

                        <FirstAidCard
                            firstAid={result.first_aid}
                        />

                    }

                    {

                        result.tests &&

                        <TestCard
                            tests={result.tests}
                        />

                    }

                    {

                        result.medicines &&

                        <MedicineCard
                            medicines={result.medicines}
                        />

                    }

                    {

                        result.home_remedies &&

                        <HomeRemedyCard
                            remedies={result.home_remedies}
                        />
                    }
                {
    showHospitalQuestion && !showAddressInput &&

    <div className="
        bg-white/10
        p-6
        rounded-3xl
    ">

        <h2 className="
            text-2xl
            text-white
        ">

            Would you like nearby hospitals?

        </h2>

        <div className="
            flex
            gap-4
            mt-5
        ">

            <button

                onClick={() => {

                    setShowAddressInput(true);
                    setShowHospitalQuestion(false);

                }}

                className="
                    bg-green-500
                    hover:bg-green-600
                    px-6
                    py-3
                    rounded-2xl
                    text-white
                    duration-300
                "

            >

                YES

            </button>


            <button

                onClick={() => {

                    setShowHospitalQuestion(false);

                }}

                className="
                    bg-red-500
                    hover:bg-red-600
                    px-6
                    py-3
                    rounded-2xl
                    text-white
                    duration-300
                "

            >

                NO

            </button>

        </div>

    </div>
}  

                </div>

            }

        </div>

    );

}

export default InputBox;