interface CartoonLadyProps {
  size?: number;
}

export const CartoonLady = ({ size = 56 }: CartoonLadyProps) => (
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
