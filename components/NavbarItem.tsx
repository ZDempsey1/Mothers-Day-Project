interface NavbarItemProps {
  label: string;
  route: string;
  expectedRoute: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, route, expectedRoute }) => {
  const active = route === expectedRoute;
  const textColor = route === '/' ? 'text-white' : 'text-black';

  return (
    <div className={`${active ? 'cursor-default font-bold text-lg' : 'hover:text-gray-300 cursor-pointer'} ${textColor} transition`}>
      {label}
    </div>
  )
}

export default NavbarItem;
