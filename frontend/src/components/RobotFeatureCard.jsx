import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function RobotFeatureCard() {
  const bubbleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bubbleRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <div className="flex justify-between  xl:max-w-[50vw]  relative">
      {/* robot image */}
      <img
        src="/chatbot-img2.png"
        alt="HaveaTalk robot mascot"
        className="w-[30vw]   right-44 relative xl:right-[10vw]  h-[30vh] sm:w-52 sm:h-52 md:w-[30vw] md:h-[30vh] lg:w-[40vw] lg:h-[40vh] xl:w-[50vw] xl:h-[50vh] object-contain"
      />

      {/* speech bubble */}
      <svg
        ref={bubbleRef}
        viewBox="0 0 340 180"
        className="xl:w-[20vw]  absolute w-[30rem]  bottom-34 -right-55   h-auto xl:left-[20vw] drop-shadow-[0_0_20px_rgba(0,0,0,0.45)]"
      >
        <defs>
          <linearGradient id="bubbleStroke" x1="0" x2="1">
            <stop offset="0" stopColor="#6743b2" />
            <stop offset="1" stopColor="#e12afb" />
          </linearGradient>
        </defs>

        <g transform="translate(10,10)">
          {/* bubble outline */}
          <path
            d="M25 15h250a15 15 0 0 1 15 15v85a15 15 0 0 1-15 15h-105l-38 28 10-28H40A15 15 0 0 1 25 115V30A15 15 0 0 1 40 15Z"
            fill="rgba(14,9,24,0.92)"
            stroke="url(#bubbleStroke)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* headline */}
          <text
            x="55"
            y="55"
            fontFamily="Inter, sans-serif"
            fontSize="18"
            fontWeight="700"
            fill="#ffffff"
          >
            Enjoy seamless communication
          </text>

          {/* sub-features */}
          <text
            x="55"
            y="85"
            fontFamily="Inter, sans-serif"
            fontSize="15"
            fontWeight="600"
            fill="#5b3aa5"
          >
            • Real-time chat   • Secure auth
          </text>
          <text
            x="55"
            y="115"
            fontFamily="Inter, sans-serif"
            fontSize="15"
            fontWeight="600"
            fill="#5b3aa5"
          >
            • Fast performance   • Multi-device sync
          </text>
        </g>
      </svg>
    </div>
  );
}
