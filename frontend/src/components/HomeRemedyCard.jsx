import { Leaf } from "lucide-react";

function HomeRemedyCard({ remedies }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-4">

                <Leaf className="text-green-400"/>

                <h2 className="text-gray-400 text-xl">

                    Home Remedies

                </h2>

            </div>

            {

                remedies?.map((item,index)=>(

                    <p
                        key={index}
                        className="text-white text-xl mb-2">

                        🌿 {item}

                    </p>

                ))

            }

        </div>

    );

}

export default HomeRemedyCard;