import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, Plane, Wifi, Clock, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export default function Home() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [errors, setErrors] = useState<{ checkIn?: string; checkOut?: string }>({});
  const navigate = useNavigate();

  const rooms = [
    {
      name: 'Standard Room',
      description: 'Comfort and convenience for the modern traveler',
      image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '₦85,000',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included']
    },
    {
      name: 'Deluxe Suite',
      description: 'Enhanced space with premium amenities',
      image: 'https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '₦135,000',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included']
    },
    {
      name: 'Executive Suite',
      description: 'Ultimate luxury for discerning guests',
      image: 'https://images.unsplash.com/photo-1774175927628-40e82ee8fe13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      price: '₦185,000',
      features: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included']
    }
  ];

  const testimonials = [
    {
      quote: 'Perfect for late-night arrivals. The pickup service was seamless and the room was exactly what I needed.',
      author: 'Adebayo O.'
    },
    {
      quote: 'Five minutes from the airport, just as advertised. Clean, comfortable, and professional service throughout.',
      author: 'Jennifer M.'
    },
    {
      quote: 'Best airport hotel in Lagos. The convenience and quality make it worth every naira.',
      author: 'Charles I.'
    }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { checkIn?: string; checkOut?: string } = {};
    if (!checkIn) newErrors.checkIn = 'Please select a check-in date';
    if (!checkOut) newErrors.checkOut = 'Please select a check-out date';
    if (checkIn && checkOut && checkOut <= checkIn) newErrors.checkOut = 'Check-out must be after check-in';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate(`/book?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative h-[720px] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1774175927628-40e82ee8fe13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Luxury hotel room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>

        <div className="relative max-w-[1200px] w-full mx-auto px-[24px] z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="text-[32px] md:text-[56px] leading-[40px] md:leading-[64px] font-serif mb-4">
                Welcome to La Regia Airport Hotel
              </h1>
              <p className="text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] mb-6 text-white/90 tracking-wide">
                Luxury & Elegance at a Serene Lagos Suburb
              </p>

              {/* Booking Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg relative"
              >
                <form onSubmit={handleBooking}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => { setCheckIn(e.target.value); setErrors(prev => ({ ...prev, checkIn: undefined })); }}
                        className={`w-full h-12 px-3 border rounded-lg text-gray-900 ${errors.checkIn ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.checkIn && <p className="text-xs text-red-500 mt-1">{errors.checkIn}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        onChange={(e) => { setCheckOut(e.target.value); setErrors(prev => ({ ...prev, checkOut: undefined })); }}
                        className={`w-full h-12 px-3 border rounded-lg text-gray-900 ${errors.checkOut ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.checkOut && <p className="text-xs text-red-500 mt-1">{errors.checkOut}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Guests</label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full h-12 px-3 border border-gray-200 rounded-lg text-gray-900"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="block w-full h-[52px] bg-[#0B1C2C] text-white rounded-lg hover:bg-[#1a2d3f] transition-colors font-medium flex items-center justify-center cursor-pointer"
                  >
                    Book Your Stay
                  </button>
                </form>
                <Link to="/book?tab=pickup" className="block w-full mt-3 text-[#C8A96A] hover:text-[#B8996A] transition-colors text-sm text-center">
                  Schedule Airport Pickup
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-[#C8A96A]" />
              <span className="text-sm text-gray-700">4-Star Rated Hotel</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Plane className="w-6 h-6 text-[#C8A96A]" />
              <span className="text-sm text-gray-700">Close to Airport</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-6 h-6 text-[#C8A96A]" />
              <span className="text-sm text-gray-700">24/7 Pickup Service</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wifi className="w-6 h-6 text-[#C8A96A]" />
              <span className="text-sm text-gray-700">Free High-Speed Wi-Fi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-24">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] font-serif text-[#0B1C2C] mb-4">Our Rooms & Suites</h2>
            <p className="text-[16px] text-gray-600">Designed for comfort. Built for convenience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-[18px] font-semibold text-[#0B1C2C] mb-2">{room.name}</h3>
                  <p className="text-[14px] text-gray-600 mb-4">{room.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-semibold text-[#C8A96A]">{room.price}<span className="text-sm text-gray-500">/night</span></span>
                    <Link to="/book" className="bg-[#0B1C2C] text-white px-4 py-2 rounded-lg hover:bg-[#1a2d3f] transition-colors text-sm">
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/rooms"
              className="inline-block border-2 border-[#0B1C2C] text-[#0B1C2C] px-8 py-3 rounded-lg hover:bg-[#0B1C2C] hover:text-white transition-all duration-300 font-medium"
            >
              View More Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Airport Pickup Section */}
      <section id="pickup" className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1771775751121-3091d79073d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Luxury airport shuttle"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] font-serif text-[#0B1C2C] mb-4">
                We Pick You Up — Anytime, Day or Night
              </h2>
              <p className="text-[16px] text-gray-600 mb-6">
                Land at any hour and we'll be there. Our professional drivers provide safe, comfortable transport between the airport and hotel. No waiting, no stress.
              </p>
              <Link to="/book?tab=pickup" className="inline-block bg-[#C8A96A] text-white px-6 py-3 rounded-lg hover:bg-[#B8996A] transition-colors">
                Schedule Pickup
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🍽️', title: 'Restaurant', text: 'Fine dining with local and international cuisine' },
              { icon: '☕', title: 'Lounge', text: 'Relax in our comfortable lounge area' },
              { icon: '🛏️', title: 'Comfort', text: 'Premium bedding and modern amenities' },
              { icon: '🔒', title: 'Security', text: '24/7 security for your peace of mind' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl border border-gray-100"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-[18px] font-semibold text-[#0B1C2C] mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] font-serif text-[#0B1C2C] text-center mb-12">Guest Reviews</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl"
              >
                <p className="text-[16px] text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-[14px] font-semibold text-[#0B1C2C]">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-[24px]">
          <h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] font-serif text-[#0B1C2C] text-center mb-12">Find Us</h2>
          <div className="relative h-[450px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.26!3d6.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnMDAuMCJOIDPCsDE1JzM2LjAiRQ!5e0!3m2!1sen!2sng!4v1234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="La Regia Airport Hotel Location"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8A96A] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#0B1C2C]">La Regia Airport Hotel</p>
                  <p className="text-sm text-gray-700">52/54 Alimosho Road, By Alaguntan Bus Stop</p>
                  <p className="text-sm text-gray-600">Iyana-Ipaja, Lagos State, Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0B1C2C]">
        <div className="max-w-[1200px] mx-auto px-[24px] text-center">
          <h2 className="text-[28px] md:text-[40px] leading-[36px] md:leading-[48px] font-serif text-white mb-6">
            Book Your Stay in Under 60 Seconds
          </h2>
          <Link to="/book" className="inline-block bg-[#C8A96A] text-white px-8 py-4 rounded-lg hover:bg-[#B8996A] transition-colors text-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}