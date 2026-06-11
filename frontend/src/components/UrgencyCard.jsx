import { AlarmClock } from "lucide-react";

function UrgencyCard({ urgency }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-3">

                <AlarmClock className="text-orange-400"/>

                <h2 className="text-gray-400 text-xl">
                    Urgency
                </h2>

            </div>

            <p className="text-2xl text-white">

                {urgency}

            </p>

        </div>

    );

}

export default UrgencyCard;