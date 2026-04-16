import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Wifi, Wind, Coffee, Shield, Tv, Bath, Users, Check, ChevronDown, ChevronUp } from 'lucide-react';

const rooms = [
  {
    id: 1,
    name: 'Standard Room',
    tagline: 'Comfort and convenience for the modern traveler',
    description:
      'Our Standard Rooms are elegantly furnished with everything you need for a relaxing stay. Ideal for solo travelers or couples on a short visit near the airport.',
    price: 85000,
    size: '25 m²',
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1760067537723-bb12d2674e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1760067537723-bb12d2674e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1759223607861-f0ef3e617739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'Flat-Screen TV', '24/7 Security', 'Daily Housekeeping'],
    badge: null,
  },
  {
    id: 2,
    name: 'Twin Room',
    tagline: 'Spacious twin beds for colleagues or friends',
    description:
      'The Twin Room features two comfortable single beds, perfect for business travelers sharing accommodation or friends visiting Lagos together.',
    price: 95000,
    size: '28 m²',
    capacity: 2,
    image: 'https://images.unsplash.com/photo-1576354302919-96748cb8299e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1576354302919-96748cb8299e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1759223607861-f0ef3e617739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'Flat-Screen TV', 'Mini Fridge', 'Writing Desk'],
    badge: null,
  },
  {
    id: 3,
    name: 'Deluxe Suite',
    tagline: 'Enhanced space with premium amenities',
    description:
      'Step up to our Deluxe Suite for a more spacious experience. Featuring a king-size bed, a separate sitting area, and premium furnishings — ideal for guests who desire extra comfort.',
    price: 135000,
    size: '40 m²',
    capacity: 3,
    image: 'https://images.unsplash.com/photo-1685592437742-3b56edb46b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1685592437742-3b56edb46b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1759223607861-f0ef3e617739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'Flat-Screen TV', 'Mini Bar', 'Lounge Seating', 'Premium Toiletries', 'Safe'],
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Executive Suite',
    tagline: 'Ultimate luxury for discerning guests',
    description:
      'Our Executive Suite redefines luxury. A sprawling layout with a king-size bed, dedicated workspace, plush lounge, and breathtaking views — designed for those who accept nothing but the best.',
    price: 185000,
    size: '55 m²',
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1745725427804-4d94df0c5eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1745725427804-4d94df0c5eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1578112010316-b44c50d27b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast Included', 'Flat-Screen TV', 'Full Mini Bar', 'Lounge Area', 'Jacuzzi', 'Safe', 'Premium Toiletries', 'Dedicated Butler'],
    badge: 'Best Value',
  },
  {
    id: 5,
    name: 'Presidential Suite',
    tagline: 'The pinnacle of elegance and prestige',
    description:
      'Reserve the Presidential Suite for an unmatched experience. Multi-room layout, private dining area, exclusive butler service, and world-class furnishings make every moment extraordinary.',
    price: 280000,
    size: '80 m²',
    capacity: 4,
    image: 'https://images.unsplash.com/photo-1578112010316-b44c50d27b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1578112010316-b44c50d27b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1685592437742-3b56edb46b15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Breakfast + Dinner Included', 'Smart TV', 'Full Bar', 'Private Dining Room', 'Jacuzzi', 'Safe', 'Butler Service', 'Airport Transfer'],
    badge: 'Luxury',
  },
];

const amenityIcons: Record<string, JSX.Element> = {
  'Free Wi-Fi': <Wifi className="w-4 h-4" />,
  'Air Conditioning': <Wind className="w-4 h-4" />,
  'Breakfast Included': <Coffee className="w-4 h-4" />,
  'Breakfast + Dinner Included': <Coffee className="w-4 h-4" />,
  '24/7 Security': <Shield className="w-4 h-4" />,
  'Flat-Screen TV': <Tv className="w-4 h-4" />,
  'Smart TV': <Tv className="w-4 h-4" />,
  'Jacuzzi': <Bath className="w-4 h-4" />,
  'Butler Service': <Users className="w-4 h-4" />,
};

const badgeColors: Record<string, string> = {
  Popular: 'bg-[#C8A96A] text-white',
  'Best Value': 'bg-[#0B1C2C] text-white',
  Luxury: 'bg-purple-700 text-white',
};

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={room.gallery[activeImage]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {room.badge && (
          <span className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full font-semibold ${badgeColors[room.badge]}`}>
            {room.badge}
          </span>
        )}
        {/* Thumbnail switcher */}
        {room.gallery.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-2">
            {room.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-2.5 h-2.5 rounded-full border-2 border-white transition-all ${activeImage === i ? 'bg-[#C8A96A]' : 'bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-[20px] font-serif text-[#0B1C2C]">{room.name}</h3>
          <div className="text-right">
            <p className="text-[20px] font-semibold text-[#C8A96A]">₦{room.price.toLocaleString()}</p>
            <p className="text-xs text-gray-500">per night</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">{room.tagline}</p>

        {/* Quick stats */}
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1"><Users className="w-4 h-4 text-[#C8A96A]" /> Up to {room.capacity} guests</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#C8A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            {room.size}
          </span>
        </div>

        {/* Description — toggle */}
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {expanded ? room.description : `${room.description.slice(0, 100)}...`}
        </p>

        {/* Amenities */}
        <div className={`grid grid-cols-2 gap-1.5 mb-4 ${expanded ? '' : 'hidden'}`}>
          {room.amenities.map((a) => (
            <div key={a} className="flex items-center gap-1.5 text-xs text-gray-700">
              <span className="text-[#C8A96A]">
                {amenityIcons[a] ?? <Check className="w-4 h-4" />}
              </span>
              {a}
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[#C8A96A] hover:text-[#B8996A] flex items-center gap-1 mb-4 self-start"
        >
          {expanded ? <>See less <ChevronUp className="w-3 h-3" /></> : <>See details <ChevronDown className="w-3 h-3" /></>}
        </button>

        <div className="mt-auto flex gap-3">
          <Link
            to={`/book?roomType=${room.id === 1 ? 'standard' : room.id === 2 ? 'twin' : room.id === 3 ? 'deluxe' : room.id === 4 ? 'executive' : 'presidential'}`}
            className="flex-1 text-center bg-[#0B1C2C] text-white py-3 rounded-lg hover:bg-[#1a2d3f] transition-colors text-sm font-medium"
          >
            Book Now
          </Link>
          <Link
            to={`/book?tab=pickup`}
            className="px-4 py-3 border border-[#C8A96A] text-[#C8A96A] rounded-lg hover:bg-[#C8A96A] hover:text-white transition-all text-sm font-medium"
          >
            + Pickup
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoomsPage() {
  const [filter, setFilter] = useState<'all' | 'budget' | 'mid' | 'luxury'>('all');

  const filtered = rooms.filter((r) => {
    if (filter === 'budget') return r.price <= 100000;
    if (filter === 'mid') return r.price > 100000 && r.price <= 185000;
    if (filter === 'luxury') return r.price > 185000;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Hero */}
      <section className="relative h-[320px] flex items-end pb-12 overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1745725427804-4d94df0c5eb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Our Rooms"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1C2C]/70" />
        </div>
        <div className="relative max-w-[1200px] w-full mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#C8A96A] text-sm tracking-widest uppercase mb-2">La Regia Airport Hotel</p>
            <h1 className="text-[36px] md:text-[52px] leading-tight font-serif text-white mb-3">
              Our Rooms & Suites
            </h1>
            <p className="text-white/80 text-[16px]">
              Five distinct categories — every one designed to make you feel at home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap gap-3">
          {[
            { key: 'all', label: 'All Rooms' },
            { key: 'budget', label: 'Up to ₦100,000' },
            { key: 'mid', label: '₦100k – ₦185k' },
            { key: 'luxury', label: '₦185k+' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                filter === f.key
                  ? 'bg-[#0B1C2C] text-white border-[#0B1C2C]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0B1C2C]'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center hidden md:block">
            {filtered.length} room{filtered.length !== 1 ? 's' : ''} available
          </span>
        </div>
      </div>

      {/* Rooms Grid */}
      <section className="py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">No rooms match this filter.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room, i) => (
                <RoomCard key={room.id} room={room} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities Banner */}
      <section className="bg-[#0B1C2C] py-14">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[24px] md:text-[32px] font-serif text-white mb-4">Every Room Includes</h2>
          <p className="text-white/70 mb-10 text-sm">Standard inclusions across all our room categories</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Wifi className="w-6 h-6" />, label: 'Free High-Speed Wi-Fi' },
              { icon: <Coffee className="w-6 h-6" />, label: 'Complimentary Breakfast' },
              { icon: <Wind className="w-6 h-6" />, label: 'Air Conditioning' },
              { icon: <Shield className="w-6 h-6" />, label: '24/7 Security' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A]">
                  {item.icon}
                </div>
                <p className="text-white/90 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <h2 className="text-[28px] font-serif text-[#0B1C2C] mb-4">Ready to Book Your Stay?</h2>
          <p className="text-gray-600 mb-8 text-sm">Select your preferred room above or go straight to the booking form.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-[#C8A96A] text-white px-8 py-4 rounded-lg hover:bg-[#B8996A] transition-colors font-medium"
            >
              Book a Room
            </Link>
            <Link
              to="/book?tab=pickup"
              className="border-2 border-[#0B1C2C] text-[#0B1C2C] px-8 py-4 rounded-lg hover:bg-[#0B1C2C] hover:text-white transition-all font-medium"
            >
              Schedule Airport Pickup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
