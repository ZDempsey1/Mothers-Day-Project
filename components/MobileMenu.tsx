import React from 'react';
import Link from 'next/link';
import NavbarItem from '@/components/NavbarItem';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
      <Link href="/">
      <NavbarItem label="Home" active />
  </Link>
  <Link href="/plants">
      <NavbarItem label="Plants" />
  </Link>
  <Link href="/favorites">
      <NavbarItem label="Favorites" />
  </Link>
  {/* ...other NavbarItem components */}
</div>
      </div>
  )
}

export default MobileMenu;
