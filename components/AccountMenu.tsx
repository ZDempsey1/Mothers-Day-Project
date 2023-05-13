// import { signOut } from 'next-auth/react';
// import React from 'react';
// import Link from 'next/link';

// import useCurrentUser from '@/hooks/useCurrentUser';

// interface AccountMenuProps {
//   visible?: boolean;
// }

// const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
//   const { data: currentUser } = useCurrentUser();

//   if (!visible) {
//     return null;
//   }

//   const profileImage = currentUser?.profileImage;

//   return (
//     <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
//       <div className="flex flex-col gap-3">
//         <Link href="/profiles">
//           <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
//             <img className="w-8 rounded-md" src={profileImage} alt="Profile image" />
//             <p className="text-white text-sm ml-2 group-hover/item:underline">{currentUser?.name}</p>
//           </div>
//         </Link>
//       </div>
//       <hr className="bg-gray-600 border-0 h-px my-4" />
//       <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
//         Sign out here!
//       </div>
//     </div>
//   )
// }

// export default AccountMenu;



import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser, status } = useCurrentUser();
  const { data: session } = useSession();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false }); // Logout without redirect
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.dataset.logoutButton === 'true') {
        // Clicked on the sign-out element, perform logout
        handleLogout();
      } else if (menuRef.current && !menuRef.current.contains(target)) {
        // Clicked outside the account menu, close the menu if open
        // (You can add logic here to close the menu if needed)
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!session) {
      router.push('/auth'); // Redirect to the auth page when logged out
    }
  }, [session, router]);

  if (status === 'loading' || !visible) {
    return null;
  }

  const profileImage = currentUser?.profileImage;

  return (
    <div ref={menuRef} className={`bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex ${visible ? 'visible' : 'hidden'}`}>
      <div className="flex flex-col gap-3">
        <Link href="/profiles">
          <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
            <img className="w-8 rounded-md" src={profileImage} alt="Profile image" />
            <p className="text-white text-sm ml-2 group-hover/item:underline">{currentUser?.name}</p>
          </div>
        </Link>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={async () => {
          await signOut(); // Perform logout
        }}
        className="px-3 text-center text-white text-sm hover:underline"
        data-logout-button="true"
      >
        Sign out here!
      </div>
    </div>
  );
};

export default AccountMenu;
