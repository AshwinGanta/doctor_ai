import { useState } from "react";
import { Search } from "lucide-react";
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
                    className="
                    flex-1
                    rounded-3xl
                    bg-white/10
                    p-5
                    text-white
                    outline-none
                    "
                    placeholder="Describe your symptoms..."
                />

                <button
                    onClick={analyzeSymptoms}
                    className="
                    bg-blue-500
                    hover:bg-blue-600
                    transition
                    rounded-3xl
                    px-8
                    text-white
                    flex items-center justify-center
                    "
                >

                    <Search />

                </button>

            </div>

            {result && (

                <div className="mt-10 space-y-5">

                    <div className="bg-white/10 p-5 rounded-3xl">

                        <h2 className="text-gray-400 text-lg">
                            Condition
                        </h2>

                        <p className="text-2xl text-white">
                            {result.condition}
                        </p>

                    </div>


                    <div className="bg-white/10 p-5 rounded-3xl">

                        <h2 className="text-gray-400 text-lg">
                            Severity
                        </h2>

                        <p className="text-2xl text-white">
                            {result.severity}
                        </p>

                    </div>


                    <div className="bg-white/10 p-5 rounded-3xl">

                        <h2 className="text-gray-400 text-lg">
                            Specialist
                        </h2>

                        <p className="text-2xl text-white">
                            {result.specialist}
                        </p>

                    </div>


                    <div className="bg-white/10 p-5 rounded-3xl">

                        <h2 className="text-gray-400 text-lg">
                            Diagnosis
                        </h2>

                        <p className="text-2xl text-white">
                            {result.diagnosis}
                        </p>

                    </div>

                </div>

            )}

        </div>

    );

}

export default InputBox;