import React from 'react';

interface MapNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'calculator', label: 'Calculator' },
  {id: 'offset', label: 'Offset'},
  { id: 'community', label: 'Community'},
  { id: 'about', label: 'About Us' },
  { id: 'profile', label: 'Profile' },
];

export const MapNavigation: React.FC<MapNavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <>
      {/* Import Roboto Condensed font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
        `}
      </style>
      <nav className="w-full sticky top-0 z-50 bg-transparent">
        <div className="flex justify-between items-center h-24 px-6 sm:px-12 py-2">
          {/* Brand with logo */}
          <div className="flex items-center space-x-5">
            <img
              src="/ecosangamlogo.png"
              alt="EcoSangam Logo"
              className="h-20 w-20 object-contain"
              style={{ display: 'block' }}
            />
            <span
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '2.2rem',
                letterSpacing: '0.006em',
                textTransform: 'uppercase',
                lineHeight: 1,
                color: '#e5e1d8'
              }}
            >
              EcoSangam
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  px-3 py-1.5
                  rounded-md
                  text-[1rem]
                  font-semibold
                  tracking-wider
                  uppercase
                  bg-transparent
                  border-none
                  outline-none
                  transition-colors
                  duration-200
                  hover:text-white
                  focus:outline-none
                  active:outline-none
                  shadow-none
                `}
                style={{
                  fontFamily: "'Roboto Condensed', sans-serif",
                  color: '#e5e1d8',
                  fontWeight: 700,
                  fontSize: '1rem',
                  boxShadow: 'none',
                }}
                tabIndex={0}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-green-200 bg-black/60">
          <div className="grid grid-cols-3 gap-2 p-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  py-2 px-1
                  rounded-md
                  text-[0.92rem]
                  font-semibold
                  tracking-wider
                  uppercase
                  bg-transparent
                  border-none
                  outline-none
                  transition-colors
                  duration-200
                  hover:text-white
                  focus:outline-none
                  active:outline-none
                  shadow-none
                  w-full
                `}
                style={{
                  fontFamily: "'Roboto Condensed', sans-serif",
                  color: '#e5e1d8',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  boxShadow: 'none',
                }}
                tabIndex={0}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MapNavigation;