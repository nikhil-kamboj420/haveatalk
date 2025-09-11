const NonotificationFound = () => {
  return (
    <div className="w-[80%]  mx-auto min-h-screen flex flex-col justify-center  text-center px-6">
      {/* Container Card */}
      <div className="border-2 mb-[30vh] border-b-fuchsia-500 bg-transparent rounded-2xl shadow-lg p-10 flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105 hover:shadow-fuchsia-500/50">
        {/* Icon */}
        <span className="text-6xl">⛔</span>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-white font-[dragrace] tracking-wider">
          No Notifications Yet.
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-md font-[mori]">
          When you receive friend requests or messages, they'll appear here.
        </p>

        {/* Extra Accent */}
        <span className="px-4 py-2 bg-[#6742bc] text-white rounded-lg shadow-inner text-sm md:text-base mt-2">
          Stay tuned 🚀
        </span>
      </div>
    </div>
  );
};

export default NonotificationFound;
