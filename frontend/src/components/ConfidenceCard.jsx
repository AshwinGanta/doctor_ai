import { ShieldCheck } from "lucide-react";

function ConfidenceCard({ confidence }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-3">

                <ShieldCheck className="text-green-400"/>

                <h2 className="text-gray-400 text-xl">

                    Confidence

                </h2>

            </div>

            <p className="text-2xl text-white">

                {confidence}%

            </p>

        </div>

    );

}

export default ConfidenceCard;