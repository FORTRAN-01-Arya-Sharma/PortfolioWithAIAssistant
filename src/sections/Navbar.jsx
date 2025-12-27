import { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-scroll'; // <-- IMPORT the Link component

// --- MODIFICATION 1: Update the Navigation component ---
// This component now uses the <Link> from react-scroll instead of <a> tags.
function Navigation({ onLinkClick }) {
  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "work", label: "Work" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <ul className="nav-ul">
      {navLinks.map((link) => (
        <li className="nav-li" key={link.to}>
          <Link
            className="nav-link" // Your existing styling class
            to={link.to}         // The ID of the section, e.g., "about"
            spy={true}           // Highlights the link when its section is in view
            smooth={true}        // Enables smooth scrolling animation
            offset={-70}         // Adjusts for your fixed header's height
            duration={500}       // Animation speed in milliseconds
            onClick={onLinkClick} // This will close the mobile menu when a link is clicked
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// --- Main Navbar Component (with minor changes) ---
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // --- MODIFICATION 2: Create a function to close the mobile menu ---
    // We'll pass this down to the Navigation component.
    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className='fixed inset-x-0 top-0 z-50 w-full backdrop-blur-lg bg-primary/40'>
            <div className='mx-auto px-4 max-w-7xl'>
                <div className='flex items-center justify-between py-2 sm:py-0'>
                    {/* Link to the top of the page */}
                    <Link to="home" smooth={true} duration={500} className='text-xl font-bold transition-colors cursor-pointer text-neutral-400 hover:text-white'>
                        Hey!
                    </Link>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'>
                        <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} className="w-6 h-6" alt="Menu icon"/>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className='hidden sm:flex'>
                        <Navigation onLinkClick={closeMenu} />
                    </nav>
                </div>
            </div>

            {/* Mobile Navigation Menu (Animated) */}
            {isOpen && (
                <motion.div
                    className='block overflow-hidden text-center sm:hidden'
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <nav className='pb-5'>
                        {/* Pass the closeMenu function here as well */}
                        <Navigation onLinkClick={closeMenu} />
                    </nav>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
