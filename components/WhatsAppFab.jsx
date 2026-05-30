"use client"

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFab() {
  const handleClick = () => {
    window.open("https://wa.me/919876543210", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fab fab-whatsapp"
      aria-label="WhatsApp"
      title="Chat on WhatsApp"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FaWhatsapp size={26} />
    </button>
  );
}