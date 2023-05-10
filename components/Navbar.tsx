import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import { useRouter } from 'next/router';



const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-10 mb-4">

      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-40' : ''} mb-10`}>
        <img src="/images/planting.png" className="h-4 lg:h-7" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
        <Link href="/">
          <NavbarItem label="Home" route={router.pathname} expectedRoute="/" />
        </Link>
        <Link href="/plants">
        <NavbarItem label="Plants" route={router.pathname} expectedRoute="/plants" />
        </Link>
        <Link href="/favorites">
        <NavbarItem label="Favorites" route={router.pathname} expectedRoute="/favorites" />
        </Link>
        <Link href="/calendar">
        <NavbarItem label="Calendar" route={router.pathname} expectedRoute="/calendar" />
        </Link>
        {router.pathname.startsWith('/plants/') && (
          <div className="text-black font-bold text-lg">
            Flower Details
          </div>
        )}
        {/* ...other NavbarItem components */}
      </div>

        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          {/* <p className="text-white text-sm">Browse</p> */}
          <p className={`${router.pathname === '/' ? 'text-white' : 'text-black'} text-sm`}>Browse</p>
          {/* <ChevronDownIcon className={`w-4 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} /> */}
          <ChevronDownIcon className={`w-4 ${router.pathname === '/' ? 'text-white' : 'text-black'} fill-current transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            {/* <MagnifyingGlassIcon className="w-6" /> */}
            <MagnifyingGlassIcon className={`w-6 ${router.pathname === '/' ? 'text-gray-200' : 'text-black'} hover:text-gray-300 cursor-pointer transition`} />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            {/* <BellIcon className="w-6" /> */}
            <BellIcon className={`w-6 ${router.pathname === '/' ? 'text-gray-200' : 'text-black'} hover:text-gray-300 cursor-pointer transition`} />

          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            {/* <ChevronDownIcon className={`w-4 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} /> */}
            <ChevronDownIcon className={`w-4 ${router.pathname === '/' ? 'text-white' : 'text-black'} fill-current transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
