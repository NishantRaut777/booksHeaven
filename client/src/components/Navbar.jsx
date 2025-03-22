import React, { useState } from 'react';
import Hamburger from 'hamburger-react'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='md:hidden flex flex-row'>
        <div className='md:hidden'>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
        </div>

        <ul className={`absolute left-0 top-16 w-full bg-gray-200 p-4 transition-transform duration-300 ease-in-out md:static md:flex md:w-auto md:p-0 ${isOpen ? "translate-y-0" : "translate-y-full"}`}>
            <li className='p-2'>
                <a href="#" className='hover:text-gray-400'>
                    Home
                </a>
            </li>
        </ul>

        <div>

        </div>

        <div>

        </div>
      </div>
    </div>
  )
}

export default Navbar
