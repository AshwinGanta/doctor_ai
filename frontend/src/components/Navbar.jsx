import { HeartPulse } from "lucide-react";

function Navbar() {

    return (

        <nav className="
        flex
        justify-between
        items-center
        px-8
        py-6">

            <div className="flex items-center gap-3">

                <HeartPulse className="text-pink-400"/>

                <h1 className="text-2xl font-bold text-white">

                    Doctor AI

                </h1>

            </div>

        </nav>

    );

}

export default Navbar;