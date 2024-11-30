import Header from "./Headers"

export default function Home() {
    return (
        <>
        <Header />
        <div className="h-screen flex items-center justify-center px-2 sm:px-4">
            <div className="relative w-full max-w-5xl">
                <img 
                    src="https://www.employmenthelp.org/wp-content/uploads/Seccond-Career-Header-Background-1030x404.png" 
                    className="w-full h-80 sm:h-[30rem] rounded-lg shadow-2xl ring-1 ring-offset-blue-300" 
                    alt="JobSphere" 
                />

                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 sm:space-y-5">
                    <h1 className="text-xl sm:text-4xl font-bold text-black">
                        Welcome to JobSphere
                    </h1>
                    <p className="text-base sm:text-2xl text-slate-800 text-center px-2">
                        Discover endless career opportunities tailored to your skills and aspirations
                    </p>
                    <div className="w-full max-w-md mt-2 sm:mt-5">
                        <input 
                            type="text" 
                            placeholder="Search for jobs..." 
                            className="w-full px-4 py-2 rounded-lg text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}
