import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Hero() {
  const FirstRoboRef = useRef(null);

  useEffect(() => {
    gsap.set([FirstRoboRef.current, ".textRef", ".textPresentRef"], {
      opacity: 0,
    });

    const tl = gsap.timeline({ delay: 1 });

    // Sabse pehle Presented by show hoga
    tl.fromTo(
      ".textPresentRef",
      { opacity: 0, y: 600 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "bounce.out",
      }
    )

      // Fir Robot image
      .fromTo(
        FirstRoboRef.current,
        { opacity: 0, scale: 0, x: -70 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1,
          ease: "back.out(1.5)",
        }
      )

      // Fir Texts one by one
      .fromTo(
        ".textRef",
        { opacity: 0, x: 200, y: -200, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.15,
        },
        "-=0.4"
      );
  }, []);

  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center    bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]">
        <div className="mx-auto grid gap-10 px-6 sm:px-8 md:px-12 text-white lg:grid-cols-2 items-center">
          {/* Left Side with Chatbot Icon */}
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-white/10 shadow-2xl h-[50vh] w-[50vw]  lg:h-[60vh] lg:w-[60vw] xl:h-[45vh] xl:w-[45vw] grid place-content-center  xl:py-80">
              <img
                ref={FirstRoboRef}
                src="/chatbot-img.webp"
                alt="Chatbot"
                className="opacity-0 w-[30vw] h-[30vh] sm:w-52 sm:h-52 md:w-[30vw] md:h-[30vh] lg:w-[40vw] lg:h-[40vh] object-contain xl:w-[50vw] xl:h-[50vh]"
              />
            </div>
          </div>

          {/* Right Side with Text */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-3xl">
            <h3
              className="textRef opacity-0  text-2xl sm:text-3xl lg:text-5xl  tracking-widest text-gray-300 py-8 mb-3 font-[mori]"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}
            >
              HaveaTalk: Next-Gen Communication
            </h3>
            <h1
              className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl py-6 tracking-widest font-[dragrace] font-extrabold leading-tight"
              style={{ textShadow: "3px 3px 8px rgba(0,0,0,0.8)" }}
            >
              <span className="textRef opacity-0  text-white">
                Conversations.
              </span>{" "}
              <span className=" textRef opacity-0 text-white">Reimagined.</span>
            </h1>

            <p
              className="textRef  opacity-0 text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 font-[mori]"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
            >
              Join the future of seamless communication.
            </p>

            <p
              className=" textPresentRef relative z-[999999]  opacity-0 text-2xl sm:text-3xl lg:text-4xl text-gray-100 font-[organical]"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.75)" }}
            >
              Presented by{" "}
              <a
                href="https://nikhil-kamboj-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <span className="  font-extrabold font-[dragrace] tracking-widest underline text-white">
                  Nikhil Kamboj
                </span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
