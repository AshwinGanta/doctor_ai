import { HeartPulse, Stethoscope, Brain } from "lucide-react";

function ResultCard({ condition, specialist, diagnosis }) {

    return (

        <>

            <div className="bg-white/10 p-6 rounded-3xl">

                <div className="flex items-center gap-3 mb-3">

                    <HeartPulse className="text-pink-400"/>

                    <h2 className="text-gray-400 text-xl">
                        Condition
                    </h2>

                </div>

                <p className="text-3xl text-white">
                    {condition}
                </p>

            </div>


            <div className="bg-white/10 p-6 rounded-3xl">

                <div className="flex items-center gap-3 mb-3">

                    <Stethoscope className="text-cyan-400"/>

                    <h2 className="text-gray-400 text-xl">
                        Specialist
                    </h2>

                </div>

                <p className="text-3xl text-white">
                    {specialist}
                </p>

            </div>


            <div className="bg-white/10 p-6 rounded-3xl">

                <div className="flex items-center gap-3 mb-3">

                    <Brain className="text-purple-400"/>

                    <h2 className="text-gray-400 text-xl">
                        Diagnosis
                    </h2>

                </div>

                <p className="text-2xl text-white">
                    {diagnosis}
                </p>

            </div>

        </>

    );

}

export default ResultCard;