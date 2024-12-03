import React, { useState, ReactNode } from 'react'
import { Joystick, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  children?: ReactNode;
}

function Sidebar({ children }: SidebarProps) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative flex">
            {/* Toggle button for mobile, only visible on smaller screens */}
            <button className="inline sm:inline-block md:inline-block lg:hidden" onClick={toggle}>
                {isOpen ? <X className='absolute top-1 left-1' /> : <Menu className='absolute top-1 left-1' />}
            </button>

            {/* Overlay background when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 transition-opacity duration-300"
                    onClick={toggle} // Close sidebar when clicking outside
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 min-h-screen w-64 bg-white shadow-2xl lg:relative`} // Fixed for mobile, relative for large screens
            >
                <div className="flex flex-col p-4">
                    <div className="flex text-2xl mb-10 shadow-xl">
                        <Joystick />
                        <button className="ml-2" onClick={() => navigate('/AdminJob')}>Create Job</button>
                    </div>
                    <div className="flex text-2xl mb-10 shadow-xl">
                        <Joystick />
                        <button className="ml-2" onClick={() => navigate('/AdminJobListings')}>View Jobs</button>
                    </div>
                    <div className="flex text-2xl shadow-xl">
                        <LogOut />
                        <button className="ml-2" onClick={() => navigate('/')}>Logout</button>
                    </div>
                </div>
            </div>

            
            <div className={`flex-grow transition-all duration-300 ${isOpen ? 'blur-sm' : ''}`}>
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
