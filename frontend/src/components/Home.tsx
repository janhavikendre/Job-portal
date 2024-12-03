import Header from "./Headers";
import './Home.css'; 

export default function Home() {
    return (
        <>
        <Header />
        <div className="h-screen flex flex-col-reverse sm:flex-row items-center justify-center sm:px-4
        bg-gradient-to-r from-white via-gray-200 to-white">
            
            <div className="relative flex flex-col justify-center items-center sm:items-start space-y-3 sm:space-y-5 w-full sm:w-1/2">
                <h1 className="text-xl sm:text-4xl mt-10 font-bold text-brown-900">
                    Welcome to JobSphere
                </h1>
                <p className="text-base sm:text-2xl text-black text-center sm:text-left px-2">
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

           
            <div className="relative w-full sm:w-1/2 flex justify-center items-center">
                <img 
                    src="https://image.shutterstock.com/image-vector/communication-between-employees-boss-gives-600nw-2492091399.jpg?app=peacock" 
                    className="w-3/4 h-auto object-cover rounded-lg shadow-2xl zoom-animation" 
                    alt="JobSphere" 
                />
            </div>
        </div>
        </>
    );
}
