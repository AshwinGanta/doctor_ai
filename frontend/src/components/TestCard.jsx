import { TestTube } from "lucide-react";

function TestCard({ tests }) {

    return (

        <div className="bg-white/10 p-6 rounded-3xl">

            <div className="flex items-center gap-3 mb-4">

                <TestTube className="text-blue-400"/>

                <h2 className="text-gray-400 text-xl">

                    Recommended Tests

                </h2>

            </div>

            {

                tests?.map((test, index) => (

                    <p
                        key={index}
                        className="text-white text-xl mb-2">

                        🧪 {test}

                    </p>

                ))

            }

        </div>

    );

}

export default TestCard;