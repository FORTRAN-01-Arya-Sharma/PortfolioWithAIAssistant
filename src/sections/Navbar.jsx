import React, { useState } from 'react'; // Added React import for safety
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence for better performance on exit
import { Link } from 'react-scroll';

function Navigation({ onLinkClick }) {
  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "work", label: "Work" },
    { to: "contact", label: "Contact" },
  ];

  return (
    <ul className="nav-ul" role="list">
      {navLinks.map((link) => (
        <li className="nav-li" key={link.to}>
          <Link
            className="nav-link"
            to={link.to}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={onLinkClick}
            activeClass="nav-link-active" // Good for SEO/Accessibility to show where the user is
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        // Added role="navigation" and aria-label for SEO/Accessibility
        <header className='fixed inset-x-0 top-0 z-50 w-full backdrop-blur-lg bg-primary/40' role="banner">
            <nav className='mx-auto px-4 max-w-7xl' aria-label="Main Navigation">
                <div className='flex items-center justify-between py-2 sm:py-0'>
                    
                    <Link 
                        to="home" 
                        smooth={true} 
                        duration={500} 
                        className='text-xl font-bold transition-colors cursor-pointer text-neutral-400 hover:text-white'
                        aria-label="Back to top"
                    >
                        Hey!
                    </Link>

                    {/* PERFORMANCE: Added width/height and aria-label to prevent Layout Shift */}
                    <button 
                        onClick={toggleMenu} 
                        className='flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden'
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <img 
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"} 
                            className="w-6 h-6" 
                            alt="" // Decorative icon should have empty alt
                            width="24" 
                            height="24" 
                            loading="eager" // Load this immediately
                        />
                    </button>

                    <div className='hidden sm:flex'>
                        <Navigation onLinkClick={closeMenu} />
                    </div>
                </div>
            </nav>

            {/* PERFORMANCE: AnimatePresence helps Framer Motion clean up the DOM efficiently */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='block overflow-hidden text-center sm:hidden bg-primary/90'
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <nav className='pb-5'>
                            <Navigation onLinkClick={closeMenu} />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;