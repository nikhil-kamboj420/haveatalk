import Footer from "./Footer";
import RobotFeatureCard from "./RobotFeatureCard";

export default function Hero() {
  return (
    <>
      <section className="relative w-full min-h-screen flex items-center justify-center bg-[linear-gradient(130deg,rgb(14,9,24)_50%,rgb(14,9,24)_50%,#6742bc_100%)]">
        <div className="mx-auto grid gap-10 px-6 sm:px-8 md:px-12 text-white lg:grid-cols-2 items-center">
          {/* Left Side with Chatbot Icon */}
          <div className="flex items-center justify-center">
            <div className="rounded-full bg-white/10 shadow-2xl h-[50vh] w-[50vw]  lg:h-[60vh] lg:w-[60vw] xl:h-[45vh] xl:w-[45vw] grid place-content-center  xl:py-80">
              <img
                src="/chatbot-img.png"
                alt="Chatbot"
                className="w-[30vw] h-[30vh] sm:w-52 sm:h-52 md:w-[30vw] md:h-[30vh] lg:w-[40vw] lg:h-[40vh] object-contain xl:w-[50vw] xl:h-[50vh]"
              />
            </div>
          </div>

          {/* Right Side with Text */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-3xl">
            <h3
              className="text-2xl sm:text-3xl lg:text-5xl  tracking-widest text-gray-300 py-8 mb-3 font-[mori]"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}
            >
              HaveaTalk: Next-Gen Communication
            </h3>

            <h1
              className="text-3xl sm:text-5xl md:text-5xl lg:text-7xl py-6 tracking-widest font-[dragrace] font-extrabold leading-tight"
              style={{ textShadow: "3px 3px 8px rgba(0,0,0,0.8)" }}
            >
              <span className="text-white">Conversations.</span>{" "}
              <span className="text-white">Reimagined.</span>
            </h1>

            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 font-[mori]"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.6)" }}
            >
              Join the future of seamless communication.
            </p>

            <p
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-100 font-[organical]"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.75)" }}
            >
              Presented by{" "}
              <span className="font-extrabold font-[dragrace] tracking-widest underline text-white">
                Nikhil Kamboj
              </span>
            </p>
          </div>
        </div>
      </section>
<section id="feature-section" className="flex justify-center items-center w-full min-h-screen  xl:max-h-[95vh] overflow-hidden bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]">
  <div className="mx-auto grid place-content-center  gap-10 px-6 sm:px-8 md:px-12 text-white lg:grid-cols-2  ">
    {/* LEFT CONTENT */}
    <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-3xl  my-10 py-10">
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
        <div className="p-5 bg-white/10 rounded-2xl shadow-lg hover:shadow-[#6742bc]/50 transition">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
            ⚡ Instant Connections
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
            Real-time messaging with zero lag — never miss a moment.
          </p>
        </div>

        <div className="p-5 bg-white/10 rounded-2xl shadow-lg hover:shadow-[#6742bc]/50 transition">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
            🤖 AI Assistance
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
            Smarter conversations with built-in AI support.
          </p>
        </div>

        <div className="p-5 bg-white/10 rounded-2xl shadow-lg hover:shadow-[#6742bc]/50 transition">
          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-2">
            📱 Cross-Platform
          </h3>
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300">
            Use it anywhere — web, mobile, or desktop.
          </p>
        </div>

        <div className="p-5 bg-white/10 rounded-2xl shadow-lg hover:shadow-[#6742bc]/50 transition">
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
        <button className="px-10 py-5 bg-[#6742bc] text-white rounded-2xl text-2xl sm:text-3xl lg:text-4xl font-semibold hover:bg-[#7b55d6] transition">
          Join the Future Today
        </button>
      </div>
    </div>

    {/* IMAGE CONTAINER (Unchanged) */}
    <div className=" m-auto rounded-full bg-white/10 shadow-2xl h-[40vh] w-[80vw]  lg:h-[60vh] lg:w-[60vw] xl:h-[45vh] xl:w-[45vw] grid place-content-center mb-10 xl:mb-70  xl:py-80">
      <RobotFeatureCard/>
    </div>
  </div>
</section>
<Footer/>
    </>
  );
}
