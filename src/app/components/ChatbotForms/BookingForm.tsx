import { BookingData } from "../ChatbotChat/types";

interface BookingFormProps {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const BookingForm = ({
  bookingData,
  setBookingData,
  onSubmit,
  onBack,
}: BookingFormProps) => (
  <div className="p-4 border-t border-gray-200 bg-white max-h-[280px] overflow-y-auto">
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Check-in Date *
        </label>
        <input
          type="date"
          value={bookingData.checkIn}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              checkIn: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Check-out Date *
        </label>
        <input
          type="date"
          value={bookingData.checkOut}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              checkOut: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Room Type
        </label>
        <select
          value={bookingData.roomType}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              roomType: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
        >
          <option value="standard">Standard Room - ₦85,000</option>
          <option value="deluxe">Deluxe Suite - ₦135,000</option>
          <option value="executive">Executive Suite - ₦185,000</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Number of Guests
        </label>
        <select
          value={bookingData.guests}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              guests: e.target.value,
            })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-[#C8A96A] text-white rounded-lg hover:bg-[#B8996A] transition-colors text-sm font-medium mt-2"
      >
        Confirm Booking
      </button>
      <button
        type="button"
        onClick={onBack}
        className="w-full py-2 text-gray-600 hover:text-gray-800 text-xs"
      >
        ← Back to menu
      </button>
    </form>
  </div>
);
