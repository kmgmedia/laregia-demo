import { Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
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
    <footer id="contact" className="bg-[#0B1C2C] text-white py-16 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">La Regia Airport Hotel</h3>
            <p className="text-sm text-gray-400">Your gateway to comfort in Lagos</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><button onClick={() => scrollToSection('rooms')} className="hover:text-[#C8A96A]">Rooms</button></li>
              <li><button onClick={() => scrollToSection('pickup')} className="hover:text-[#C8A96A]">Airport Pickup</button></li>
              <li><button onClick={() => scrollToSection('home')} className="hover:text-[#C8A96A]">Amenities</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#C8A96A]">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@laregiahotel.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>52/54 Alimosho Road, By Alaguntan Bus Stop, Iyana-Ipaja, Lagos State</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="https://www.instagram.com/laregiaairport.hotel/" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A96A]">Instagram</a></li>
              <li><a href="#" className="hover:text-[#C8A96A]">Facebook</a></li>
              <li><a href="#" className="hover:text-[#C8A96A]">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2026 La Regia Airport Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
