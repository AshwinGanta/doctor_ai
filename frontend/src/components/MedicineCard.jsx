import { Pill } from "lucide-react";

function MedicineCard({ medicines }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-4">

                <Pill className="text-pink-400"/>

                <h2 className="text-gray-400 text-xl">

                    Medicines

                </h2>

            </div>

            {

                medicines?.map((medicine,index)=>(

                    <p
                        key={index}
                        className="text-white text-xl mb-2">

                        💊 {medicine}

                    </p>

                ))

            }

        </div>

    );

}

export default MedicineCard;