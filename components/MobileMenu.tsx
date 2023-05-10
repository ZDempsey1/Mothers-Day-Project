// import React from 'react';
// import Link from 'next/link';
// import NavbarItem from '@/components/NavbarItem';
// import { useRouter } from 'next/router';


// interface MobileMenuProps {
//   visible?: boolean;

// }

// const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
//   if (!visible) {
//     return null;
//   }
//   const router = useRouter();
//   return (
//     <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
//       <div className="flex flex-col gap-4">
//       {/* <Link href="/">
//       <NavbarItem label="Home" />
//   </Link>
//   <Link href="/plants">
//       <NavbarItem label="Plants" />
//   </Link>
//   <Link href="/favorites">
//       <NavbarItem label="Favorites" />
//   </Link> */}
//   <Link href="/">
//           <NavbarItem label="Home" route={router.pathname} expectedRoute="/" showBackground={showBackground} />
//         </Link>
//         <Link href="/plants">
//           <NavbarItem label="Plants" route={router.pathname} expectedRoute="/plants" showBackground={showBackground} />
//         </Link>
//         <Link href="/favorites">
//           <NavbarItem label="Favorites" route={router.pathname} expectedRoute="/favorites" showBackground={showBackground} />
//         </Link>
//         <Link href="/calendar">
//           <NavbarItem label="Calendar" route={router.pathname} expectedRoute="/calendar" showBackground={showBackground} />
//         </Link>
//   {/* ...other NavbarItem components */}
// </div>
//       </div>
//   )
// }

// export default MobileMenu;

import React from 'react';
import Link from 'next/link';
import NavbarItem from '@/components/NavbarItem';
import { useRouter } from 'next/router';

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter();
  if (!visible) {
    return null;
  }
  const showBackground = true; // Add this line to define the showBackground variable

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <NavbarItem label="Home" route={router.pathname} expectedRoute="/" showBackground={showBackground} />
        </Link>
        <Link href="/plants">
          <NavbarItem label="Plants" route={router.pathname} expectedRoute="/plants" showBackground={showBackground} />
        </Link>
        <Link href="/favorites">
          <NavbarItem label="Favorites" route={router.pathname} expectedRoute="/favorites" showBackground={showBackground} />
        </Link>
        <Link href="/calendar">
          <NavbarItem label="Calendar" route={router.pathname} expectedRoute="/calendar" showBackground={showBackground} />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
