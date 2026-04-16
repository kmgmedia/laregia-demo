import { PickupData } from "../ChatbotChat/types";

interface PickupFormProps {
  pickupData: PickupData;
  setPickupData: (data: PickupData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const PickupForm = ({
  pickupData,
  setPickupData,
  onSubmit,
  onBack,
}: PickupFormProps) => (
  <div className="p-4 border-t border-gray-200 bg-white max-h-[280px] overflow-y-auto">
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Your Name *
        </label>
        <input
          type="text"
          value={pickupData.name}
          onChange={(e) =>
            setPickupData({ ...pickupData, name: e.target.value })
          }
          placeholder="Full name"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Arrival Date *
        </label>
        <input
          type="date"
          value={pickupData.date}
          onChange={(e) =>
            setPickupData({ ...pickupData, date: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Flight Number *
        </label>
        <input
          type="text"
          value={pickupData.flightNumber}
          onChange={(e) =>
            setPickupData({
              ...pickupData,
              flightNumber: e.target.value,
            })
          }
          placeholder="e.g. BA075"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1 font-medium">
          Expected Arrival Time *
        </label>
        <input
          type="time"
          value={pickupData.time}
          onChange={(e) =>
            setPickupData({ ...pickupData, time: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-[#C8A96A] text-white rounded-lg hover:bg-[#B8996A] transition-colors text-sm font-medium mt-2"
      >
        Schedule Pickup
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
