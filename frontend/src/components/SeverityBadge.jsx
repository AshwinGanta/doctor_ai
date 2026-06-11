function SeverityBadge({ severity }) {

    if (!severity) return null;

    if (severity.toLowerCase() === "high") {

        return (

            <div className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-red-500/20
            text-red-400
            font-bold
            shadow-lg shadow-red-500/30">

                HIGH

            </div>

        );

    }

    if (severity.toLowerCase() === "moderate") {

        return (

            <div className="
            inline-block
            px-5
            py-2
            rounded-full
            bg-yellow-500/20
            text-yellow-300
            font-bold
            shadow-lg shadow-yellow-500/30">

                MODERATE

            </div>

        );

    }

    return (

        <div className="
        inline-block
        px-5
        py-2
        rounded-full
        bg-green-500/20
        text-green-400
        font-bold
        shadow-lg shadow-green-500/30">

            LOW

        </div>

    );

}

export default SeverityBadge;