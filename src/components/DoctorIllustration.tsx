export default function DoctorIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Friendly doctor with a stethoscope"
    >
      {/* Background blob */}
      <ellipse cx="250" cy="250" rx="230" ry="220" fill="url(#bgGrad)" opacity="0.12" />
      <circle cx="250" cy="250" r="160" fill="url(#bgGrad)" opacity="0.08" />

      {/* Decorative dots */}
      <circle cx="90" cy="120" r="6" fill="#14b8a6" opacity="0.5" />
      <circle cx="420" cy="160" r="8" fill="#1676f5" opacity="0.4" />
      <circle cx="410" cy="380" r="5" fill="#14b8a6" opacity="0.5" />
      <circle cx="80" cy="360" r="7" fill="#1676f5" opacity="0.35" />

      {/* Plus signs */}
      <g opacity="0.4">
        <rect x="70" y="240" width="14" height="4" rx="2" fill="#14b8a6" />
        <rect x="75" y="235" width="4" height="14" rx="2" fill="#14b8a6" />
      </g>
      <g opacity="0.4">
        <rect x="430" y="260" width="14" height="4" rx="2" fill="#1676f5" />
        <rect x="435" y="255" width="4" height="14" rx="2" fill="#1676f5" />
      </g>

      {/* Doctor body / coat */}
      <path
        d="M170 360 Q170 300 210 285 L290 285 Q330 300 330 360 L330 460 L170 460 Z"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="2"
      />
      {/* Coat collar */}
      <path d="M210 285 L250 320 L290 285 L290 300 L250 335 L210 300 Z" fill="#f1f5f9" />
      {/* Coat buttons */}
      <circle cx="250" cy="350" r="4" fill="#cbd5e1" />
      <circle cx="250" cy="380" r="4" fill="#cbd5e1" />
      <circle cx="250" cy="410" r="4" fill="#cbd5e1" />

      {/* Stethoscope */}
      <path
        d="M200 330 Q180 370 190 410 Q195 430 215 430 Q230 430 230 415 Q230 405 220 405 Q210 405 210 415"
        stroke="#0f766e"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="215" cy="430" r="9" fill="#14b8a6" />
      <circle cx="215" cy="430" r="5" fill="#0f766e" />

      {/* Neck */}
      <rect x="235" y="250" width="30" height="45" rx="12" fill="#f5d0b0" />
      {/* Neck shadow */}
      <path d="M235 275 Q250 285 265 275 L265 295 L235 295 Z" fill="#e8b890" opacity="0.5" />

      {/* Head */}
      <ellipse cx="250" cy="210" rx="55" ry="60" fill="#f5d0b0" />
      {/* Hair */}
      <path
        d="M195 195 Q195 145 250 145 Q305 145 305 195 Q305 175 285 168 Q270 175 250 172 Q230 175 215 168 Q195 175 195 195 Z"
        fill="#3b2a1e"
      />
      {/* Hair sides */}
      <path d="M195 195 Q188 220 195 240 L200 200 Z" fill="#3b2a1e" />
      <path d="M305 195 Q312 220 305 240 L300 200 Z" fill="#3b2a1e" />

      {/* Ears */}
      <ellipse cx="196" cy="215" rx="7" ry="11" fill="#f0c5a0" />
      <ellipse cx="304" cy="215" rx="7" ry="11" fill="#f0c5a0" />

      {/* Eyes */}
      <ellipse cx="228" cy="210" rx="6" ry="7" fill="#1e293b" />
      <ellipse cx="272" cy="210" rx="6" ry="7" fill="#1e293b" />
      <circle cx="230" cy="208" r="2" fill="white" />
      <circle cx="274" cy="208" r="2" fill="white" />

      {/* Eyebrows */}
      <path d="M218 196 Q228 191 238 196" stroke="#3b2a1e" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M262 196 Q272 191 282 196" stroke="#3b2a1e" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M250 220 L247 235 Q250 238 253 235 Z" fill="#e8b890" opacity="0.6" />

      {/* Smile */}
      <path d="M230 245 Q250 258 270 245" stroke="#c97a5a" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="215" cy="235" r="8" fill="#f0a890" opacity="0.4" />
      <circle cx="285" cy="235" r="8" fill="#f0a890" opacity="0.4" />

      {/* Badge / ID */}
      <rect x="285" y="340" width="34" height="26" rx="5" fill="#1676f5" />
      <rect x="290" y="346" width="24" height="3" rx="1.5" fill="white" opacity="0.8" />
      <rect x="290" y="353" width="18" height="3" rx="1.5" fill="white" opacity="0.6" />
      <circle cx="293" cy="360" r="3" fill="white" opacity="0.7" />

      {/* Tablet in hand */}
      <g transform="rotate(-12 150 390)">
        <rect x="120" y="365" width="60" height="44" rx="6" fill="#1e293b" />
        <rect x="125" y="370" width="50" height="34" rx="3" fill="#1676f5" />
        <path d="M132 384 L140 384 M132 390 L150 390" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <circle cx="150" cy="378" r="3" fill="#14b8a6" />
      </g>

      {/* Floating chat bubble */}
      <g className="animate-float">
        <rect x="350" y="120" width="100" height="60" rx="16" fill="white" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M360 180 L355 195 L372 180 Z" fill="white" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="372" cy="150" r="5" fill="#1676f5" />
        <circle cx="388" cy="150" r="5" fill="#14b8a6" />
        <circle cx="404" cy="150" r="5" fill="#1676f5" />
      </g>

      {/* Heart pulse icon */}
      <g transform="translate(60 180)">
        <circle cx="20" cy="20" r="22" fill="white" stroke="#e2e8f0" strokeWidth="2" />
        <path
          d="M8 20 L14 20 L17 14 L21 26 L24 20 L32 20"
          stroke="#ef4444"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1676f5" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
