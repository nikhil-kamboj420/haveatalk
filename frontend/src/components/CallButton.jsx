function CallButton({ handleVideoCall }) {
  return (
    <div className=" flex items-center justify-end  mx-auto  absolute top-7 right-5">
      <button onClick={handleVideoCall}>
        <img
          src="/call-icon.webp"
          alt="video call icon"
          className="w-15 h-12 rounded-full bg-gradient-to-r from-[#6743b2] to-[rgb(14,9,24)]"
        />
      </button>
    </div>
  );
}

export default CallButton;
