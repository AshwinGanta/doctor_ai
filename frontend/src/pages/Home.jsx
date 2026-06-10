import InputBox from "../components/InputBox";

function Home() {

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]"></div>

            <InputBox />

        </div>

    );
}

export default Home;