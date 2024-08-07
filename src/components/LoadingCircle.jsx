export default function LoadingCircle() {
    return (
        <div className="flex items-center justify-center h-screen w-full absolute top-0 left-0">
            <div className="relative">
                <div className="w-24 h-24 border-y-8 rounded-full border-lime-500"></div>
                <div className="w-24 h-24 border-y-8 rounded-full absolute top-0 left-0 border-blue-500 animate-spin"></div>
                <p className="mt-2 text-center">Loading...</p>
            </div>
        </div>
    )
}