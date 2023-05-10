// interface NavbarItemProps {
//   label: string;
//   route: string;
//   expectedRoute: string;
//   showBackground: boolean;
// }


// const NavbarItem: React.FC<NavbarItemProps> = ({ label, route, expectedRoute, showBackground }) => {
//   const active = route === expectedRoute;
//   const textColor = showBackground ? 'text-white' : 'text-black';

//   return (
//     <div className={`${active ? 'font-bold text-lg' : ''} ${textColor} cursor-pointer transition`}>
//       {label}
//     </div>
//   );
// };

// export default NavbarItem;
interface NavbarItemProps {
  label: string;
  route: string;
  expectedRoute: string;
  showBackground: boolean;
  // active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, route, expectedRoute, showBackground }) => {
  const active = route === expectedRoute;
  // const textColor = showBackground || route !== '/' ? 'text-black' : 'text-white';
  const textColor = showBackground ? 'text-white' : (route !== '/' ? 'text-black' : 'text-white');

  return (
    <div className={`${active ? 'font-bold text-lg' : ''} ${textColor} cursor-pointer transition`}>
      {label}
    </div>
  );
};

export default NavbarItem;
