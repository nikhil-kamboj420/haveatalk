
function CallButton({ handleVideoCall }) {
  return (
    <div className=" flex items-center justify-end  mx-auto w-full absolute top-7">
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
        <img src="https://cdn-icons-png.flaticon.com/512/3735/3735311.png" alt="video call icon"  className="w-20 h-20" />
      </button>
    </div>
  );
}

export default CallButton;