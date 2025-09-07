export default function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 text-center flex flex-col items-center gap-8">
        {/* Brand / Tagline */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[dragrace] font-extrabold tracking-widest"
          style={{ textShadow: "3px 3px 8px rgba(0,0,0,0.8)" }}
        >
          HaveaTalk
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-200 font-[mori] max-w-2xl"
          style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
        >
          Conversations. Reimagined.  
          Connecting people with speed, clarity, and security — the future of communication is here.
        </p>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 font-[Dragrace]">
          <a href="#" className="text-xl font-semibold hover:text-[#d1c4ff] transition tracking-[0.5rem]">
            Home
          </a>
          <a href="#feature-section" className="text-xl font-semibold hover:text-[#d1c4ff] transition  tracking-[0.5rem]">
            Features
          </a>
          <a href="https://nikhil-kamboj-portfolio.netlify.app/" target="_blank" className="text-xl font-semibold hover:text-[#d1c4ff] transition  tracking-[0.5rem]">
            About-Owner
          </a>
          <a href="https://nikhil-kamboj-portfolio.netlify.app/#contact-section" target="_blank" className="text-xl font-semibold hover:text-[#d1c4ff] transition  tracking-[0.5rem]">
            Contact
          </a>
        </div>

        {/* Social Icons (optional placeholders) */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="https://github.com/nikhil-kamboj420" target="_blank" rel="noopener noreferrer">
            <img src="/github-img.png" alt="GitHub"  title="Github" className="w-10 h-10 hover:scale-110 transition" />
          </a>
          <a href="https://www.linkedin.com/in/nikhil-kamboj-632a8b350/" target="_blank" rel="noopener noreferrer">
            <img src="/linkedIn-img.png" alt="LinkedIn"  title="LinkedIn" className="w-10 h-10 hover:scale-110 transition" />
          </a>
          <a href="mailto:kambojnikhil44@gmail.com">
            <img src="/gmail-img.png" alt="Email"  title="Gmail" className="w-10 h-10 hover:scale-110 transition" />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-10 text-sm text-gray-400">
          © {new Date().getFullYear()} HaveaTalk. Designed & Presented by   {" "} 
          <span className="font-[dragrace] tracking-[0.5rem] font-bold text-[1rem] text-white px-7 ">
            Nikhil Kamboj
          </span>
        </p>
      </div>
    </footer>
  );
}

