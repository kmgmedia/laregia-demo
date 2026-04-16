import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Mail, Phone, User, CreditCard, Check } from 'lucide-react';
import { useSearchParams } from 'react-router';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'pickup' ? 'pickup' : 'room';
  const initialCheckIn = searchParams.get('checkIn') || '';
  const initialCheckOut = searchParams.get('checkOut') || '';
  const initialGuests = searchParams.get('guests') || '1';

  const [bookingType, setBookingType] = useState<'room' | 'pickup'>(initialTab);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const [formData, setFormData] = useState({
    // Room booking fields
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    roomType: 'standard',
    guests: initialGuests,
    specialRequests: '',
    // Pickup fields
    flightNumber: '',
    arrivalDate: '',
    arrivalTime: '',
    pickupName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmNum = (bookingType === 'room' ? 'LR' : 'LP') + Math.floor(Math.random() * 1000000);
    setConfirmationNumber(confirmNum);
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      roomType: 'standard',
      guests: '1',
      specialRequests: '',
      flightNumber: '',
      arrivalDate: '',
      arrivalTime: '',
      pickupName: ''
    });
    setShowSuccess(false);
    setConfirmationNumber('');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-[600px] mx-auto px-[24px] py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif text-[#0B1C2C] mb-4">
              {bookingType === 'room' ? 'Booking Confirmed!' : 'Pickup Scheduled!'}
            </h1>
            <p className="text-gray-600 mb-6">
              Your confirmation number is:
            </p>
            <div className="bg-[#C8A96A] text-white text-2xl font-semibold py-4 px-6 rounded-lg mb-8">
              {confirmationNumber}
            </div>

            {bookingType === 'room' ? (
              <div className="text-left bg-gray-50 p-6 rounded-xl mb-6 space-y-2">
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Guest:</span> {formData.firstName} {formData.lastName}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Check-in:</span> {formData.checkIn}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Check-out:</span> {formData.checkOut}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Room:</span> {formData.roomType === 'standard' ? 'Standard Room' : formData.roomType === 'deluxe' ? 'Deluxe Suite' : 'Executive Suite'}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Guests:</span> {formData.guests}</p>
              </div>
            ) : (
              <div className="text-left bg-gray-50 p-6 rounded-xl mb-6 space-y-2">
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Name:</span> {formData.pickupName}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Flight:</span> {formData.flightNumber}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Date:</span> {formData.arrivalDate}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold text-[#0B1C2C]">Time:</span> {formData.arrivalTime}</p>
              </div>
            )}

            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to <span className="font-semibold text-[#0B1C2C]">{formData.email}</span>
            </p>

            <div className="space-y-3">
              <button
                onClick={resetForm}
                className="w-full bg-[#0B1C2C] text-white py-3 rounded-lg hover:bg-[#1a2d3f] transition-colors"
              >
                Make Another Booking
              </button>
              <a
                href="/"
                className="block w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-[800px] mx-auto px-[24px] py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[40px] leading-[48px] font-serif text-[#0B1C2C] mb-4 text-center">Complete Your Booking</h1>
          <p className="text-gray-600 text-center mb-8">We're excited to welcome you to La Regia Airport Hotel</p>

          {/* Booking Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setBookingType('room')}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                bookingType === 'room'
                  ? 'bg-[#0B1C2C] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              🛏️ Book a Room
            </button>
            <button
              onClick={() => setBookingType('pickup')}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                bookingType === 'pickup'
                  ? 'bg-[#0B1C2C] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              🚗 Airport Pickup
            </button>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {bookingType === 'room' ? (
              <>
                <h2 className="text-2xl font-serif text-[#0B1C2C] mb-6">Room Booking Details</h2>

                {/* Personal Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0B1C2C] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#C8A96A]" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0B1C2C] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#C8A96A]" />
                    Stay Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date *</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date *</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Type *</label>
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      >
                        <option value="standard">Standard Room - ₦85,000/night</option>
                        <option value="deluxe">Deluxe Suite - ₦135,000/night</option>
                        <option value="executive">Executive Suite - ₦185,000/night</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Guests *</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                    placeholder="Any special requirements or preferences..."
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#0B1C2C] mb-6">Airport Pickup Details</h2>

                {/* Passenger Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0B1C2C] mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#C8A96A]" />
                    Passenger Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="pickupName"
                        value={formData.pickupName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        placeholder="Name for the driver's sign"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#0B1C2C] mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#C8A96A]" />
                    Flight Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flight Number *</label>
                      <input
                        type="text"
                        name="flightNumber"
                        value={formData.flightNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        placeholder="e.g. BA075"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Arrival Date *</label>
                      <input
                        type="date"
                        name="arrivalDate"
                        value={formData.arrivalDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Arrival Time *</label>
                      <input
                        type="time"
                        name="arrivalTime"
                        value={formData.arrivalTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#C8A96A] focus:border-transparent"
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Our driver will meet you at the arrivals terminal with a sign displaying your name. We'll track your flight and adjust for any delays.
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#C8A96A] text-white py-4 rounded-lg hover:bg-[#B8996A] transition-colors font-semibold text-lg"
            >
              {bookingType === 'room' ? 'Confirm Booking' : 'Schedule Pickup'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}