import { Loader2 } from "lucide-react";

function LoadingScreen() {

    return (

        <div className="
        flex
        flex-col
        items-center
        justify-center
        gap-5
        py-16">

            <Loader2
                size={60}
                className="text-blue-400 animate-spin"
            />

            <h2 className="text-white text-2xl">

                Analyzing Symptoms...

            </h2>

            <p className="text-gray-400">

                Please wait

            </p>

        </div>

    );

}

export default LoadingScreen;