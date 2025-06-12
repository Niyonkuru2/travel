import { Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50 text-white">
      {/* Left side: Logo */}
      <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
        <img src="/logo.png" alt="Travel Escape Logo" className="w-8 h-8 object-contain" />
        <span>Travel Escape</span>
      </div>

      {/* Right side: Nav links + Icons */}
      <div className="flex items-center gap-8">
        <ul className="flex gap-8 text-sm uppercase font-semibold">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Destinations</li>
          <li className="cursor-pointer">Blog</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
        <div className="flex gap-4">
          <button className="p-2 cursor-pointer">
            <Search size={20} />
          </button>
          <button className="p-2 cursor-pointer">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
