import { useState } from "react";
import { Search } from "lucide-react";

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

    async function analyzeSymptoms() {

        try {

            setLoading(true);

            const response = await API.post("/analyze", {

                symptoms: symptoms

            });

            setResult(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="
        bg-white/10
        backdrop-blur-3xl
        p-10
        rounded-[40px]
        shadow-2xl
        w-[700px]
        ">

            <h1 className="text-6xl font-bold text-white text-center">

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
                    "

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
                    "

                >

                    <Search />

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


                    <UrgencyCard

                        urgency={result.urgency}

                    />


                    <ConfidenceCard

                        confidence={result.confidence}

                    />


                    <FirstAidCard

                        firstAid={result.first_aid}

                    />


                    <TestCard

                        tests={result.tests}

                    />


                    <MedicineCard

                        medicines={result.medicines}

                    />


                    <HomeRemedyCard

                        remedies={result.home_remedies}

                    />

                </div>

            }

        </div>

    );

}

export default InputBox;