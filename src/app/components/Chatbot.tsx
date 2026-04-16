import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Check } from "lucide-react";

type ChatStep =
  | "welcome"
  | "booking"
  | "pickup"
  | "question"
  | "booking-form"
  | "pickup-form"
  | "success";

interface Message {
  text: string;
  isBot: boolean;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
}

interface PickupData {
  date: string;
  flightNumber: string;
  time: string;
  name: string;
}

// Cartoon Lady Avatar Component
const CartoonLady = ({ size = 56 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Skin tone background */}
    <defs>
      <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#f5c9a1", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#e8b899", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    {/* Hair */}
    <ellipse cx="50" cy="35" rx="28" ry="30" fill="#8B4513" />
    {/* Hair shine */}
    <path d="M 35 25 Q 40 20 45 25" fill="#A0522D" opacity="0.6" />

    {/* Face */}
    <circle cx="50" cy="50" r="22" fill="url(#skinGradient)" />

    {/* Left Eye */}
    <circle cx="42" cy="46" r="4" fill="#FFFFFF" />
    <circle cx="42" cy="46" r="2.5" fill="#4a90e2" />
    <circle cx="41.5" cy="45" r="1.2" fill="#000000" />

    {/* Right Eye */}
    <circle cx="58" cy="46" r="4" fill="#FFFFFF" />
    <circle cx="58" cy="46" r="2.5" fill="#4a90e2" />
    <circle cx="58.5" cy="45" r="1.2" fill="#000000" />

    {/* Eyebrows */}
    <path
      d="M 38 42 Q 42 40 46 42"
      stroke="#6B3410"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M 54 42 Q 58 40 62 42"
      stroke="#6B3410"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />

    {/* Nose */}
    <line
      x1="50"
      y1="48"
      x2="50"
      y2="54"
      stroke="#d9a574"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Mouth - Smile */}
    <path
      d="M 45 58 Q 50 61 55 58"
      stroke="#E07B7B"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />

    {/* Blush */}
    <circle cx="36" cy="52" r="2.5" fill="#FFB6C1" opacity="0.7" />
    <circle cx="64" cy="52" r="2.5" fill="#FFB6C1" opacity="0.7" />

    {/* Neck */}
    <rect x="46" y="70" width="8" height="12" fill="url(#skinGradient)" />

    {/* Shoulders with colorful top */}
    <ellipse cx="50" cy="88" rx="26" ry="15" fill="#C8A96A" />
    {/* Top accent */}
    <ellipse cx="50" cy="83" rx="24" ry="8" fill="#D4AF85" opacity="0.8" />

    {/* Sparkle effect */}
    <circle cx="28" cy="30" r="1.5" fill="#FFD700" opacity="0.8" />
    <circle cx="72" cy="35" r="1.5" fill="#FFD700" opacity="0.8" />
  </svg>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [step, setStep] = useState<ChatStep>("welcome");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi 👋 I'm Bola, your La Regia Airport Hotel assistant! How can I help you today?",
      isBot: true,
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "standard",
  });

  const [pickupData, setPickupData] = useState<PickupData>({
    date: "",
    flightNumber: "",
    time: "",
    name: "",
  });

  // Show and hide tooltip every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleOption = (option: ChatStep, message: string) => {
    setMessages([...messages, { text: message, isBot: false }]);

    // Show typing indicator first
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "⏳ Typing...", isBot: true }]);

      // Replace typing indicator with actual response
      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev];
          updated.pop(); // Remove typing indicator

          if (option === "booking") {
            updated.push({
              text: "Great choice! Let me help you book a room. Please fill in your details below.",
              isBot: true,
            });
            setStep("booking-form");
          } else if (option === "pickup") {
            updated.push({
              text: "Perfect! I'll help you schedule your airport pickup. Please provide your flight details.",
              isBot: true,
            });
            setStep("pickup-form");
          } else if (option === "question") {
            updated.push({
              text: "I'm here to help! What would you like to know about La Regia Airport Hotel?",
              isBot: true,
            });
            setStep("question");
          }
          return updated;
        });
      }, 1500);
    }, 300);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const confirmationNumber = "LR" + Math.floor(Math.random() * 1000000);
    setMessages((prev) => [
      ...prev,
      {
        text: `Booking Details:\n• Check-in: ${bookingData.checkIn}\n• Check-out: ${bookingData.checkOut}\n• Guests: ${bookingData.guests}\n• Room: ${bookingData.roomType}`,
        isBot: false,
      },
      { text: "⏳ Typing...", isBot: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            text: `✅ Booking Confirmed!\n\nConfirmation #: ${confirmationNumber}\n\nYour room is reserved. We've sent a confirmation email with all the details.\n\nNeed airport pickup? Let me know!`,
            isBot: true,
          },
        ];
      });
      setStep("success");
    }, 2000);
  };

  const handlePickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !pickupData.date ||
      !pickupData.flightNumber ||
      !pickupData.time ||
      !pickupData.name
    ) {
      alert("Please fill in all fields");
      return;
    }

    const confirmationNumber = "LP" + Math.floor(Math.random() * 1000000);
    setMessages((prev) => [
      ...prev,
      {
        text: `Pickup Details:\n• Name: ${pickupData.name}\n• Flight: ${pickupData.flightNumber}\n• Date: ${pickupData.date}\n• Time: ${pickupData.time}`,
        isBot: false,
      },
      { text: "⏳ Typing...", isBot: true },
    ]);

    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          {
            text: `✅ Pickup Scheduled!\n\nConfirmation #: ${confirmationNumber}\n\nOur driver will meet you at the arrivals terminal with a sign displaying your name. We'll track your flight and adjust for any delays.\n\nSee you soon! 🚗`,
            isBot: true,
          },
        ];
      });
      setStep("success");
    }, 2000);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { text: userInput, isBot: false }]);

    // Add typing indicator
    const typingMessage = { text: "⏳ Typing...", isBot: true };
    setMessages((prev) => [...prev, typingMessage]);

    const responses: { [key: string]: string } = {
      "room type|room option|room category":
        "We have 3 room types: Standard Room (₦85,000), Deluxe Suite (₦135,000), and Executive Suite (₦185,000). All include breakfast, Wi-Fi, and air conditioning. Would you like to book?",

      "price|cost|rate|tariff":
        "Our rates: Standard (₦85,000), Deluxe (₦135,000), Executive (₦185,000) per night. All include breakfast, Wi-Fi, 24-hour room service, and complimentary airport pickup.",

      "pickup|airport pickup|airport transport|airport shuttle":
        "Yes! We offer FREE 24/7 airport pickup for all guests. Just provide your flight details when booking, and our driver will meet you at the arrivals terminal. We track your flight in real-time.",

      "location|airport distance|where are you located|near airport|how far|how far is|distance to airport|how many minutes":
        "We're just 5 minutes from Murtala Muhammed International Airport (MMA) in Lagos. Very convenient for airport transfers and close to Lagos city center (15-20 minutes away).",

      "wifi|internet|web|connection|online":
        "Yes! We provide complimentary high-speed Wi-Fi throughout the entire hotel in all rooms, lobbies, restaurant, and common areas.",

      "restaurant|dining|breakfast|lunch|dinner":
        "Our restaurant is open 6 AM - 11 PM daily, serving local and international cuisine. Breakfast is complimentary for all guests and served 6:30 AM - 10 AM. We also offer 24/7 room service.",

      "order delivery|food delivery|outside|food outside|external restaurant|uber eats|jumia|delivery app|bring food from outside|can i order food":
        "Yes, you can order food from outside restaurants using delivery apps like Uber Eats or Jumia! There's a small ₦500 delivery coordination fee. You can also bring your own food. We'll provide plates and utensils upon request. Perfect if you want specific cuisines! 🍕",

      "bring my own|bring|personal food|my own restaurant|bring food|own food|external food":
        "Absolutely! You're welcome to bring or order your own food from outside restaurants. We provide complimentary plates, utensils, napkins, and cold beverages. No restrictions on external food! 😊",

      "can i use delivery apps|food apps|doordash|uber eats|jumia food":
        "Yes! You can order from any delivery app (Uber Eats, Jumia Food, etc.). We charge a small ₦500 delivery coordination fee to ensure smooth delivery to your room. Our front desk can help guide delivery drivers to your room.",

      "external catering|bring caterer|outside caterer|my own food service":
        "Yes, we allow external catering for special events and room functions! Please inform us 24 hours in advance. A small coordination fee applies. Contact our events team: +234 123 456 7890 or info@laregiahotel.com.",

      "check-in|check-out|timing|arrival time|departure time|hours":
        "Check-in is 2:00 PM and check-out is 12:00 PM. Early check-in and late check-out are available upon request (fees may apply for late check-out). Contact us in advance if you need special arrangements.",

      "amenities|facilities|what do you offer|what's included":
        "We offer free Wi-Fi, 24/7 airport pickup, on-site restaurant, fitness center, pool, business center, 24/7 front desk, room service, and 24/7 security. Would you like details on any specific amenity?",

      "payment|credit card|bank transfer|deposit|accept":
        "We accept credit cards, debit cards, bank transfers, cash, and mobile money. A deposit is required to secure your booking, with full payment due upon arrival.",

      "cancel|cancellation|refund|change booking|modify":
        "Cancellations 7 days before arrival get a full refund. 4-6 days before: 50% refund. Less than 72 hours: Non-refundable. Contact us ASAP to cancel or modify: +234 123 456 7890.",

      "special request|allergy|diet|vegetarian|accessible|wheelchair":
        "We happily accommodate dietary needs (vegetarian, vegan, halal, gluten-free), wheelchair accessibility, and all special requests. Just inform us when booking or call +234 123 456 7890.",

      "event|conference|meeting|group|wedding|party":
        "Perfect for events! We have conference rooms, catering services, and flexible layouts. Contact our events team: +234 123 456 7890 or info@laregiahotel.com for group bookings.",

      "security|safe|safety":
        "Your safety is paramount. We have 24/7 CCTV, professional security staff, safes in every room, secure key card access, and 24/7 emergency response. Contact us anytime if you have concerns.",

      "business|meeting|conference|work":
        "Perfect for business! We offer high-speed Wi-Fi, dedicated work desks, business center, meeting rooms, and conference facilities. Open 24/7 with complimentary amenities for business guests.",

      "review|rating|complaint|issue|problem":
        "We'd love your feedback! Please leave reviews on Google or TripAdvisor. Have an issue? Contact us immediately at +234 123 456 7890 or info@laregiahotel.com. Your satisfaction is guaranteed!",

      "loyalty|member|frequent|reward|discount":
        "We offer special rates for repeat guests, room upgrades, and loyalty benefits. Ask about our corporate and group discounts when booking!",

      "weather|climate|lagoon|attractions|things to do":
        "Lagos has a tropical climate year-round. Visit during dry season (Nov-Mar) for best weather. Nearby attractions include Lekki Lagoon, beaches, museums, and shopping. Our concierge can help arrange tours!",

      "parking|car park|vehicle|garage|where to park":
        "We offer FREE complimentary parking for all guests in our secure, gated parking lot with 24/7 surveillance. Valet parking service is also available upon request.",

      "pet|dog|cat|animal|furry friend":
        "Yes, pets are welcome! There's a ₦5,000 per night pet fee. Small to medium-sized, well-behaved pets are accommodated with prior notification. Please call +234 123 456 7890 to arrange.",

      "pool|swimming|water|recreation":
        "Yes, we have an outdoor swimming pool open 7 AM - 7 PM daily, free for all guests. We also have a fitness center, game room, and recreational facilities available.",

      "gym|fitness|exercise|workout|sports":
        "Our fitness center is open 6 AM - 10 PM with modern equipment, professional trainers, and yoga classes. Access is complimentary for all guests. Personal training available upon request.",

      "spa|massage|massage|sauna|wellness|relax|treatment":
        "We offer massage therapy, facials, sauna, and wellness treatments. Prices start at ₦15,000 for facials and ₦18,000 for massages. Book in advance at +234 123 456 7890 or at the front desk.",

      "kids|children|family|baby|toddler|young":
        "Family-friendly! Kids stay free, complimentary cribs/high chairs available, babysitting services, kids' menu, and safe family areas. We also have a game room and pool perfect for families.",

      "housekeeping|cleaning|room service|maid|laundry":
        "Daily housekeeping available, 24/7 room service, laundry service with 24-hour turnaround (express laundry 4-6 hours available). Call front desk for any room service needs.",

      "contact|phone|email|number|reach|call":
        "📞 Phone: +234 123 456 7890 | 📧 Email: info@laregiahotel.com | 💬 WhatsApp: +234 123 456 7890. We're available 24/7!",

      "smoking|cigarette|smoke|tobacco":
        "The hotel is non-smoking. A designated outdoor smoking area is available. Smoking in rooms results in a ₦50,000 cleaning fee. We maintain a fresh-air environment for all guests.",

      "discount|student|senior|military|group rate":
        "Yes! Student (15%), Senior (10%), Military (12%), and Group (20%+) discounts available. Provide valid ID when booking. Contact us for corporate rates: +234 123 456 7890.",

      "lost and found|lost item|found|missing":
        "Contact front desk immediately if you lose something. We conduct thorough searches and store lost items for 30 days. Use the room safe for valuables. Call +234 123 456 7890.",

      "internet|tv|entertainment|cable|channels|movies":
        "In-room TV with cable channels and streaming apps (Netflix), complimentary high-speed Wi-Fi, game room, and weekend live entertainment. Multiple entertainment options available 24/7.",

      "hospital|doctor|medical|emergency|pharmacy":
        "For emergencies, contact front desk immediately: +234 123 456 7890. Several hospitals are nearby (5-15 min away). 24-hour pharmacy within walking distance. We have first aid staff on-site.",

      "how|support|help|assistance|question":
        "I'm Bola, your La Regia Airport Hotel assistant! 👋 I'm here 24/7 to help with bookings, airport pickup, rooms, amenities, and questions. What can I help you with?",
    };

    const lowerInput = userInput.toLowerCase();
    let response =
      "Thank you for your question! 😊 I'm Bola, La Regia Airport Hotel's assistant. While I might not have information about everything, I'm here to help with bookings, airport pickup, room details, and general hotel inquiries.\n\nFor other questions or specific assistance, please contact our team:\n📞 +234 123 456 7890\n📧 info@laregiahotel.com\n\nHow else can I assist you?";

    // Check for keyword matches - prioritize specific matches over generic ones
    // Sort entries by number of keywords (more specific patterns first) and keyword length
    const sortedResponses = Object.entries(responses).sort(
      ([keysA], [keysB]) => {
        const countA = keysA.split("|").length;
        const countB = keysB.split("|").length;
        const lenA = keysA.length;
        const lenB = keysB.length;
        // Sort by keyword count (descending) then by length (descending)
        return countB - countA || lenB - lenA;
      },
    );

    for (const [keywords, responseText] of sortedResponses) {
      const keywordList = keywords.split("|");
      // Skip generic "how" match if it's the last resort - check if it's just generic keywords
      if (keywords.includes("how|support|help|assistance|question")) {
        continue; // Skip in first pass, use as fallback only
      }
      if (keywordList.some((keyword) => lowerInput.includes(keyword.trim()))) {
        response = responseText;
        break;
      }
    }

    // If no specific match found, check for generic "how/help" as last resort
    if (response.includes("While I might not have information")) {
      for (const [keywords, responseText] of Object.entries(responses)) {
        if (keywords.includes("how|support|help|assistance|question")) {
          const keywordList = keywords.split("|");
          if (
            keywordList.some((keyword) => lowerInput.includes(keyword.trim()))
          ) {
            response = responseText;
            break;
          }
        }
      }
    }

    // Replace typing indicator with actual response after delay
    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        // Remove the typing indicator (last message) and add the response
        updated.pop();
        return [...updated, { text: response, isBot: true }];
      });
    }, 2000); // 2 second delay to simulate typing

    setUserInput("");
  };

  const resetChat = () => {
    setStep("welcome");
    setMessages([
      {
        text: "Hi 👋 I'm Bola, your La Regia Airport Hotel assistant! How can I help you today?",
        isBot: true,
      },
    ]);
    setBookingData({
      checkIn: "",
      checkOut: "",
      guests: "1",
      roomType: "standard",
    });
    setPickupData({ date: "", flightNumber: "", time: "", name: "" });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="fixed bottom-6 right-6 md:bottom-6 md:right-6 w-14 h-14 bg-[#C8A96A] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#B8996A] transition-colors z-50"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <CartoonLady size={48} />}
      </motion.button>

      {/* Tooltip Card */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-7 right-24 md:bottom-7 md:right-24 w-40 bg-gradient-to-r from-[#C8A96A] to-[#B8996A] text-white rounded-lg shadow-lg p-2 z-50"
          >
            <div className="flex items-start gap-1.5">
              <div className="text-base">👋</div>
              <div>
                <p className="font-semibold text-xs">Hi! I'm Bola</p>
                <p className="text-xs mt-0.5 leading-tight">
                  Chat for bookings & info!
                </p>
              </div>
            </div>
            {/* Arrow pointer */}
            <div className="absolute bottom-2 right-0 w-0 h-0 border-l-6 border-t-6 border-l-transparent border-t-[#B8996A] transform translate-x-6"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 md:bottom-24 md:right-6 w-[calc(100vw-48px)] md:w-[380px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[580px]"
          >
            {/* Header */}
            <div className="bg-[#0B1C2C] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-semibold">Bola 🤖</h3>
                <p className="text-xs text-gray-300">Online now</p>
              </div>
              <button
                onClick={resetChat}
                className="text-white/70 hover:text-white text-xs px-2 py-1 bg-white/10 rounded"
              >
                Reset
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                      message.isBot
                        ? "bg-white text-gray-800 shadow-sm"
                        : "bg-[#C8A96A] text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Options/Forms */}
            <div className="flex-shrink-0">
              {step === "welcome" && (
                <div className="p-4 space-y-2 border-t border-gray-200 bg-white">
                  <button
                    onClick={() => handleOption("booking", "Book a Room")}
                    className="w-full py-2.5 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#1a2d3f] transition-colors text-sm font-medium"
                  >
                    📅 Book a Room
                  </button>
                  <button
                    onClick={() =>
                      handleOption("pickup", "Schedule Airport Pickup")
                    }
                    className="w-full py-2.5 bg-white border border-[#0B1C2C] text-[#0B1C2C] rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    🚗 Airport Pickup
                  </button>
                  <button
                    onClick={() =>
                      handleOption("question", "I have a question")
                    }
                    className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    💬 Ask a Question
                  </button>
                </div>
              )}

              {step === "booking-form" && (
                <div className="p-4 border-t border-gray-200 bg-white max-h-[280px] overflow-y-auto">
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
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
                        <option value="standard">
                          Standard Room - ₦85,000
                        </option>
                        <option value="deluxe">Deluxe Suite - ₦135,000</option>
                        <option value="executive">
                          Executive Suite - ₦185,000
                        </option>
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
                      onClick={resetChat}
                      className="w-full py-2 text-gray-600 hover:text-gray-800 text-xs"
                    >
                      ← Back to menu
                    </button>
                  </form>
                </div>
              )}

              {step === "pickup-form" && (
                <div className="p-4 border-t border-gray-200 bg-white max-h-[280px] overflow-y-auto">
                  <form onSubmit={handlePickupSubmit} className="space-y-3">
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
                      onClick={resetChat}
                      className="w-full py-2 text-gray-600 hover:text-gray-800 text-xs"
                    >
                      ← Back to menu
                    </button>
                  </form>
                </div>
              )}

              {step === "question" && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleQuestionSubmit} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask about rooms, prices, amenities..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                      <button
                        type="submit"
                        className="p-2 bg-[#C8A96A] text-white rounded-lg hover:bg-[#B8996A] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={resetChat}
                      className="w-full py-2 text-gray-600 hover:text-gray-800 text-xs"
                    >
                      ← Back to menu
                    </button>
                  </form>
                </div>
              )}

              {step === "success" && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <button
                    onClick={resetChat}
                    className="w-full py-2.5 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#1a2d3f] transition-colors text-sm font-medium"
                  >
                    Start New Conversation
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
