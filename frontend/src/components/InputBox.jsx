import { useState } from "react";
import {
    Search,
    HeartPulse,
    Activity,
    Stethoscope,
    Brain
} from "lucide-react";

import { API } from "../services/api";

function InputBox() {

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
                shadow-lg shadow-red-500/30
                ">

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
                shadow-lg shadow-yellow-500/30
                ">

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
            shadow-lg shadow-green-500/30
            ">

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

        ${

            result?.severity?.toLowerCase() === "high"
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
                animate-pulse
                ">

                    ⚠ EMERGENCY DETECTED

                    <br />

                    Seek Immediate Medical Attention

                </div>
            }

            <h1 className={`

            text-6xl
            font-bold
            text-center

            ${

                result?.severity?.toLowerCase() === "high"
                    ? "text-red-400"
                    : "text-white"

                }

            `}>

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
                    text-xl
                    "
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
                    shadow-lg shadow-blue-500/30
                    "
                >

                    <Search />

                </button>

            </div>


            {

                result &&

                <div className="mt-10 space-y-6">

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



                    <div className="bg-white/10 p-6 rounded-3xl">

                        <div className="flex items-center gap-3 mb-3">

                            <Activity className="text-yellow-400" />

                            <h2 className="text-gray-400 text-xl">
                                Severity
                            </h2>

                        </div>

                        {getSeverityBadge()}

                    </div>



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

                </div>

            }

        </div>

    );

}

export default InputBox;