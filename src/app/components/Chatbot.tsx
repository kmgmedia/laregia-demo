import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import { CartoonLady } from "./ChatbotAvatar/CartoonLady";
import { BookingForm } from "./ChatbotForms/BookingForm";
import { PickupForm } from "./ChatbotForms/PickupForm";
import {
  chatResponses,
  defaultFallbackResponse,
} from "./ChatbotChat/chatResponses";
import type {
  ChatStep,
  Message,
  BookingData,
  PickupData,
} from "./ChatbotChat/types";

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
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "⏳ Typing...", isBot: true }]);
      setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev];
          updated.pop();
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
    const lowerInput = userInput.toLowerCase();
    const bookingKeywords = [
      "book",
      "booking",
      "reserve",
      "reservation",
      "room",
      "can i book",
      "want to book",
      "book a room",
      "book now",
    ];
    if (bookingKeywords.some((keyword) => lowerInput.includes(keyword))) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Great choice! Let me help you book a room. Please fill in your details below.",
          isBot: true,
        },
      ]);
      setStep("booking-form");
      setUserInput("");
      return;
    }
    const pickupKeywords = [
      "pickup",
      "airport pickup",
      "airport transfer",
      "airport shuttle",
      "pick me up",
      "schedule pickup",
    ];
    if (pickupKeywords.some((keyword) => lowerInput.includes(keyword))) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Perfect! I'll help you schedule your airport pickup. Please provide your flight details.",
          isBot: true,
        },
      ]);
      setStep("pickup-form");
      setUserInput("");
      return;
    }
    setMessages((prev) => [...prev, { text: "⏳ Typing...", isBot: true }]);
    let response = defaultFallbackResponse;
    const sortedResponses = Object.entries(chatResponses).sort(
      ([keysA], [keysB]) => {
        const countA = keysA.split("|").length;
        const countB = keysB.split("|").length;
        const lenA = keysA.length;
        const lenB = keysB.length;
        return countB - countA || lenB - lenA;
      },
    );
    for (const [keywords, responseText] of sortedResponses) {
      const keywordList = keywords.split("|");
      if (keywords.includes("how|support|help|assistance|question")) {
        continue;
      }
      if (keywordList.some((keyword) => lowerInput.includes(keyword.trim()))) {
        response = responseText;
        break;
      }
    }
    if (response.includes("While I might not have information")) {
      for (const [keywords, responseText] of Object.entries(chatResponses)) {
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
    setTimeout(() => {
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [...updated, { text: response, isBot: true }];
      });
    }, 2000);
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
            <div className="absolute bottom-2 right-0 w-0 h-0 border-l-6 border-t-6 border-l-transparent border-t-[#B8996A] transform translate-x-6"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 md:bottom-24 md:right-6 w-[calc(100vw-48px)] md:w-[380px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[580px]"
          >
            <div className="bg-[#0B1C2C] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-semibold">Bola</h3>
                <p className="text-xs text-gray-300">Online now</p>
              </div>
              <button
                onClick={resetChat}
                className="text-white/70 hover:text-white text-xs px-2 py-1 bg-white/10 rounded"
              >
                Reset
              </button>
            </div>

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
                <BookingForm
                  bookingData={bookingData}
                  setBookingData={setBookingData}
                  onSubmit={handleBookingSubmit}
                  onBack={resetChat}
                />
              )}
              {step === "pickup-form" && (
                <PickupForm
                  pickupData={pickupData}
                  setPickupData={setPickupData}
                  onSubmit={handlePickupSubmit}
                  onBack={resetChat}
                />
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
                    className="w-full py-2 bg-[#0B1C2C] text-white rounded-lg hover:bg-[#1a2d3f] transition-colors text-sm font-medium"
                  >
                    ← Start New Chat
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
