import { Syringe } from "lucide-react";

function FirstAidCard({ firstAid }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-3">

                <Syringe className="text-red-300"/>

                <h2 className="text-gray-400 text-xl">

                    First Aid

                </h2>

            </div>

            <p className="text-2xl text-white">

                {firstAid}

            </p>

        </div>

    );

}

export default FirstAidCard;