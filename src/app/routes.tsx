import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import RoomsPage from "./pages/RoomsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "book", Component: BookingPage },
      { path: "rooms", Component: RoomsPage },
    ],
  },
]);