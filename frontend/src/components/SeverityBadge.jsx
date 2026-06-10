function SeverityBadge({ severity }) {

    if (severity.toLowerCase() === "high") {

        return (
            <div className="
            bg-red-500/20
            text-red-400
            rounded-full
            px-5
            py-2
            inline-block
            font-bold
            shadow-lg shadow-red-500/30
            ">
                HIGH
            </div>
        );
    }

    if (severity.toLowerCase() === "moderate") {

        return (
            <div className="
            bg-yellow-500/20
            text-yellow-300
            rounded-full
            px-5
            py-2
            inline-block
            font-bold
            ">
                MODERATE
            </div>
        );
    }

    return (

        <div className="
        bg-green-500/20
        text-green-400
        rounded-full
        px-5
        py-2
        inline-block
        font-bold
        ">
            LOW
        </div>

    );
}

export default SeverityBadge;