import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RobotFeatureCard from "./RobotFeatureCard";
import { NavLink } from "react-router";

gsap.registerPlugin(ScrollTrigger);

export default function FeatureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".feature-card"),
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        stagger: 0.4,
        ease: "elastic.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // jab section viewport me aaye
          end: "bottom 20%", // end point tak scrub karega
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="feature-section"
      className="flex justify-center items-center w-full min-h-screen xl:max-h-[95vh] overflow-hidden bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]"
    >
      <div className="mx-auto grid place-content-center gap-10 px-6 sm:px-8 md:px-12 text-white lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-3xl my-10 py-10">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-[dragrace] font-extrabold leading-snug mb-6"
            style={{ textShadow: "3px 3px 8px rgba(0,0,0,0.8)" }}
          >
            Why Choose <span className="text-[#d1c4ff]">HaveaTalk?</span>
          </h2>

          <p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 mb-10 font-[mori]"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
          >
            We’re redefining the way conversations happen — faster, smarter, and
            more secure than ever.
          </p>

          {/* FEATURES */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="feature-card p-5 bg-white/10 rounded-2xl shadow-lg">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
                ⚡ Instant Connections
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                Real-time messaging with zero lag — never miss a moment.
              </p>
            </div>
            <div className="feature-card p-5 bg-white/10 rounded-2xl shadow-lg">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
                🤖 AI Assistance
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                Smarter conversations with built-in AI support.
              </p>
            </div>
            <div className="feature-card p-5 bg-white/10 rounded-2xl shadow-lg">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
                📱 Cross-Platform
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                Use it anywhere — web, mobile, or desktop.
              </p>
            </div>
            <div className="feature-card p-5 bg-white/10 rounded-2xl shadow-lg">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
                🔒 Secure & Private
              </h3>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
                End-to-end encryption keeps your chats safe.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <NavLink
              to={"/friends"}
              className="px-10 py-5 bg-[#6742bc] text-white rounded-2xl text-2xl sm:text-3xl lg:text-4xl font-semibold hover:bg-[#7b55d6] transition"
            >
              Join the Future Today
            </NavLink>
          </div>
        </div>

        {/* IMAGE CONTAINER */}
        <div className="m-auto rounded-full bg-white/10 shadow-2xl h-[40vh] w-[80vw] lg:h-[60vh] lg:w-[60vw] xl:h-[45vh] xl:w-[45vw] grid place-content-center mb-10 xl:mb-70 xl:py-80">
          <RobotFeatureCard />
        </div>
      </div>
    </section>
  );
}
