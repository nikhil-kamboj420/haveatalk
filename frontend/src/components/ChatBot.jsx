import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendUserMessage } from "../lib/api";
import gsap from "gsap";

const ChatBot = () => {
  const [click, setClick] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const chatHistoryRef = useRef(null);
  const chatbotRef = useRef(null);

  const { mutate: sendMsgMutation, isPending } = useMutation({
    mutationFn: sendUserMessage,
    onSuccess: (data) => {
      if (data.reply) {
        addMessage(data.reply);
      } else {
        addMessage("Sorry, there was an error.");
      }
    },
    onError: () => {
      addMessage(" Sorry, there was an error.");
    },
  });

  const addMessage = (message) => {
    setChatHistory((prev) => [...prev, message]);
  };

  useEffect(() => {
    gsap.fromTo(
      chatbotRef.current,
      { opacity: 0, scaleY: 0.4, x: 200 },
      {
        opacity: 1,
        scaleY: 1,
        x: 0,
        duration: 1.3,
        ease: "bounce.out",
      }
    );
    gsap.fromTo(
      chatbotRef.current.querySelector("h3"),
      { opacity: 0, scaleY: 0 },
      {
        opacity: 1,
        scaleY: 1,
        duration: 2,
        ease: "bounce.out",
        yoyo: true,
        repeat: -1,
      }
    );
  }, []);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const sendMessage = () => {
    const message = userMessage.trim();
    if (!message) return;

    addMessage(message);
    setUserMessage("");
    sendMsgMutation({ message });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {!click && (
        <div
          ref={chatbotRef}
          className="fixed z-[99999] bottom-5 right-2  md:bottom-[2.9rem] md:right-20 cursor-pointer
 "
        >
          <h3 className="text-2xl text-white font-extrabold font-[mori] relative left-[8rem] top-[2.6rem]   md:left-[15rem] md:top-[4rem] bg-black w-15 md:w-20 text-center py-3.5  border-2 border-pink-600 rounded-[1.4rem]">
            H i{" "}
          </h3>
          <img
            src="/chatbotAi-img.webp"
            alt="chatbot AI image"
            className="max-w-[12rem] max-h-[12rem]   md:max-w-[20rem] md:max-h-[20rem]"
            onClick={() => setClick(true)}
          />
        </div>
      )}
      {click && (
        <div className="fixed z-[999999] bottom-6 right-6 w-full max-w-[28rem] md:max-w-[38rem] bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col p-5 border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg md:text-xl text-white font-semibold flex items-center gap-2">
              👋 Hey there!
            </p>
            <button
              onClick={() => setClick(!click)}
              className="p-2 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition"
            >
              ✖
            </button>
          </div>

          <p className="text-2xl  text-gray-300 mb-3">
            I’m your assistant, ask me anything anytime 🚀
          </p>

          {/* Chat history */}
          <div
            ref={chatHistoryRef}
            className="flex-grow overflow-y-auto mb-3 p-3 bg-white/90 rounded-lg h-[30vh] shadow-inner scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`my-1 p-2 rounded-lg max-w-[80%] text-2xl ${
                  index % 2 === 0
                    ? "bg-amber-100 text-gray-900 self-start"
                    : "bg-gray-800 text-white self-end ml-auto"
                }`}
              >
                {msg}
              </div>
            ))}
          </div>

          {/* Input & Send */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-gray-100 py-2 px-3 text-2xl  rounded-lg outline-none focus:ring-2 focus:ring-amber-400 transition font-semibold tracking-[0.12rem]"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isPending}
            />
            <button
              className="px-4 py-2  border-2 border-fuchsia-500  text-lg md:text-xl font-semibold font-[dragrace] tracking-[0.2rem] hover:bg-fuchsia-500 hover:text-black transition text-white disabled:opacity-50 rounded-xl"
              onClick={sendMessage}
              disabled={isPending}
            >
              {isPending ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
