import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    // Navigate to home first if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-[24px] h-20 flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-serif text-[#0B1C2C]">La Regia Airport Hotel</Link>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-[#0B1C2C] hover:text-[#C8A96A] transition-colors">Home</button>
            <button onClick={() => scrollToSection('rooms')} className="text-[#0B1C2C] hover:text-[#C8A96A] transition-colors">Rooms</button>
            <button onClick={() => scrollToSection('pickup')} className="text-[#0B1C2C] hover:text-[#C8A96A] transition-colors">Airport Pickup</button>
            <button onClick={() => scrollToSection('contact')} className="text-[#0B1C2C] hover:text-[#C8A96A] transition-colors">Contact</button>
            <Link to="/book" className="bg-[#C8A96A] text-white px-5 py-2.5 rounded-lg hover:bg-[#B8996A] transition-colors">
              Book Now
            </Link>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-[#0B1C2C] p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 right-0 w-full h-[calc(100vh-80px)] bg-white z-40 md:hidden shadow-lg"
          >
            <div className="flex flex-col p-6 space-y-4">
              <button onClick={() => { scrollToSection('home'); setMobileMenuOpen(false); }} className="text-left text-lg text-[#0B1C2C] hover:text-[#C8A96A] transition-colors py-3 border-b border-gray-100">Home</button>
              <button onClick={() => { scrollToSection('rooms'); setMobileMenuOpen(false); }} className="text-left text-lg text-[#0B1C2C] hover:text-[#C8A96A] transition-colors py-3 border-b border-gray-100">Rooms</button>
              <button onClick={() => { scrollToSection('pickup'); setMobileMenuOpen(false); }} className="text-left text-lg text-[#0B1C2C] hover:text-[#C8A96A] transition-colors py-3 border-b border-gray-100">Airport Pickup</button>
              <button onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }} className="text-left text-lg text-[#0B1C2C] hover:text-[#C8A96A] transition-colors py-3 border-b border-gray-100">Contact</button>
              <Link to="/book" onClick={() => setMobileMenuOpen(false)} className="bg-[#C8A96A] text-white px-5 py-3 rounded-lg hover:bg-[#B8996A] transition-colors text-lg mt-4 text-center">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
