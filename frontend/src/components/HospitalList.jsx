{
hospitals.map(

(hospital,index)=>

<div

    key={index}

    className="
    bg-white/10
    p-4
    rounded-2xl
    mt-4
    text-white
    "

>

    <div className="flex justify-between">

        <span>

            {hospital.name}

        </span>

        <span className="text-cyan-400 font-semibold">

            {hospital.distance} km

        </span>

    </div>

</div>

)
}