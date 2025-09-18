export const ChatLoader = () => {
  return (
    <div className="max-w-screen h-[100vh] bg-[url('/bg-common.webp')] bg-cover bg-center grid place-content-center">
      <p className="text-4xl md:text-9xl text-white font-extrabold font-[mori] flex items-center gap-4">
        <span className="w-20 h-20 border-4 mx-5 border-white border-t-[#0e0918] rounded-full inline-block animate-[spin_1s_linear_infinite]"></span>
        Connecting to Chat ...
      </p>
    </div>
  );
};
