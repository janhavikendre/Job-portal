import React, { useState, ReactNode } from 'react'
import { Joystick, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';     
import { useNavigate } from 'react-router-dom';
import AdminJob from './AdminJob';

interface SidebarProps {
  children?: ReactNode;
}

function Sidebar({ children }: SidebarProps) {
    const navigate = useNavigate();
    const [isOpen , setIsOpen] = useState(false);
    const toogle = () => {
        setIsOpen(!isOpen)
    }
     
  return (
    
<div className='flex flex-col '>
    <button className='inline sm:inline-block md:inline-block lg:hidden' onClick={toogle}>{isOpen ?<X/> :<Menu />}</button>
     { isOpen ? 
     <div className='min-h-screen w-36 shadow-2xl'>
    <div className='flex text-2xl mt-10 mb-10 shadow-xl ml-2 ' >
        
      <Joystick /><button>create job</button>
    
    </div>
    <div className='flex text-2xl shadow-xl ml-2 mb-10'>
    <Joystick/><button>view job</button>
    </div>
    <div className='flex text-2xl shadow-xl ml-2'>
        <LogOut/><button>logout</button>
    </div>
    </div>
    : 
    null
}
</div>

  )
}

export default Sidebar