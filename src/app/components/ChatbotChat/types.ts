export type ChatStep =
  | "welcome"
  | "booking"
  | "pickup"
  | "question"
  | "booking-form"
  | "pickup-form"
  | "success";

export interface Message {
  text: string;
  isBot: boolean;
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomType: string;
}

export interface PickupData {
  date: string;
  flightNumber: string;
  time: string;
  name: string;
}
