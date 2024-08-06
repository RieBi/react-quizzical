export default function Welcome() {
    return (
        <div className="
        flex flex-col justify-center items-center text-center mt-[30vh]
        text-slate-700
        ">
            <h1 className="font-bold text-3xl mb-2">Quizzical</h1>
            <p>A quiz game to test the sharpness of your mind</p>   
            <button className="bg-indigo-500 text-white mt-5 px-24 py-4 rounded-xl">
                <h2>Start quiz</h2>
            </button>
        </div>
    )
}