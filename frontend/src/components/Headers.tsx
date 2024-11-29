import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [showAdminOptions, setShowAdminOptions] = useState(false); // Toggle for Admin options
  const [showUserOptions, setShowUserOptions] = useState(false);   // Toggle for User options
  const [showMobileMenu, setShowMobileMenu] = useState(false);     // Toggle for mobile menu
  const adminOptionsRef = useRef<HTMLDivElement>(null); // Ref for Admin dropdown
  const userOptionsRef = useRef<HTMLDivElement>(null);  // Ref for User dropdown
  const mobileMenuRef = useRef<HTMLDivElement>(null);  // Ref for mobile menu

  // Function to toggle the admin button
  const toggleAdminOptions = () => {
    setShowAdminOptions((prevState) => !prevState);
    setShowUserOptions(false); // Hide user options if admin is clicked
  };

  // Function to toggle the user button
  const toggleUserOptions = () => {
    setShowUserOptions((prevState) => !prevState);
    setShowAdminOptions(false); // Hide admin options if user is clicked
  };

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu((prevState) => !prevState);
  };

  // Function to close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        adminOptionsRef.current && !adminOptionsRef.current.contains(event.target as Node) &&
        userOptionsRef.current && !userOptionsRef.current.contains(event.target as Node) &&
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowAdminOptions(false);
        setShowUserOptions(false);
        setShowMobileMenu(false); // Close mobile menu if clicked outside
      }
    };

    // Adding the event listener to the document when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/021/666/174/small_2x/find-job-silhouette-icon-job-recruitment-icon-set-illustration-template-for-web-and-mobile-vector.jpg"
          className="h-10 w-10"
          alt="JobSphere Logo"
        />
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold">JobSphere</h1>
      </div>

      {/* Admin and User Toggle Buttons for Desktop */}
      <div className="hidden sm:flex space-x-8 text-lg">
        {/* Admin Button */}
        <button
          onClick={toggleAdminOptions}
          className="cursor-pointer text-gray-700 bg-slate-100 p-3 rounded-xl"
        >
          Admin
        </button>

        {/* User Button */}
        <button
          onClick={toggleUserOptions}
          className="cursor-pointer text-slate-700 bg-slate-100 p-3 rounded-xl"
        >
          User
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-500">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 right-0 bg-white shadow-lg p-3 rounded-xl z-20 w-40"
        >
          {/* Admin Options */}
          <button
            onClick={toggleAdminOptions}
            className="block px-4 py-2 text-gray-700 w-full text-left"
          >
            Admin
          </button>

          {/* User Options */}
          <button
            onClick={toggleUserOptions}
            className="block px-4 py-2 text-gray-700 w-full text-left"
          >
            User
          </button>
        </div>
      )}

      {/* Admin Options */}
      {showAdminOptions && (
        <div
          ref={adminOptionsRef}
          className="absolute top-16 right-10 bg-white shadow-lg p-3 rounded-xl z-20"
        >
          <Link to={"/admin-login"}>
            <button className="block px-4 py-2 text-gray-700">Login</button>
          </Link>
          <Link to={"/admin-signup"}>
            <button className="block px-4 py-2 text-gray-700">Signup</button>
          </Link>
        </div>
      )}

      {/* User Options */}
      {showUserOptions && (
        <div
          ref={userOptionsRef}
          className="absolute top-16 right-0 bg-white shadow-lg p-3 rounded-xl z-20"
        >
          <Link to={"/user-login"}>
            <button className="block px-4 py-2 text-gray-700">Login</button>
          </Link>
          <Link to={"/user-signup"}>
            <button className="block px-4 py-2 text-gray-700">Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
}
