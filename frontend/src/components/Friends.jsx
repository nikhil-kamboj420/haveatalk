import { Link } from "react-router";
import PageLoader from "./PageLoader";
import { FriendCard } from "./FriendCard";
import { useFriendRequests } from "../contexts/FriendRequestContext";
import { useState, useEffect, useRef } from "react";

export const Friends = ({ loadFriends, friends }) => {
  const { incomingRequests, rejectedRequests } = useFriendRequests();

  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const prevCountRef = useRef(0);

  // 🔹 Total requests
  const totalNotifications =
    (incomingRequests?.length ?? 0) + (rejectedRequests?.length ?? 0);

  // 🔹 Load seen notifications on mount
  useEffect(() => {
    const savedSeenCount = localStorage.getItem("seenFriendsNotifications");
    if (savedSeenCount) {
      prevCountRef.current = parseInt(savedSeenCount, 10);
    }

    if (totalNotifications > prevCountRef.current) {
      setShowNotificationAlert(true);
    }
  }, []);

  // 🔹 New notification check
  useEffect(() => {
    if (totalNotifications > prevCountRef.current) {
      setShowNotificationAlert(true);
    }
  }, [totalNotifications]);

  // 🔹 OnClick -> hide + mark seen
  const handleNotificationClick = () => {
    setShowNotificationAlert(false);
    prevCountRef.current = totalNotifications;
    localStorage.setItem(
      "seenFriendsNotifications",
      totalNotifications.toString()
    );
  };

  return (
    <div
      id="friendwrapper"
      className="min-h-[40vh] px-4 md:px-10 py-8 max-w-[80vw] my-[8vh] md:my-[10vh] mx-auto bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]"
    >
      {/* Friend Title */}
      <div className="friend-title text-3xl md:text-4xl lg:text-5xl font-bold flex justify-between items-center mb-8">
        <h1 className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
          Friends
        </h1>
        <Link
          to="/notification"
          onClick={handleNotificationClick}
          className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-lg md:text-xl flex items-center gap-2 shadow-md transition-colors relative"
        >
          👥 Friend Requests
          {showNotificationAlert && (
            <span className="w-7 h-7 flex items-center justify-center bg-red-500 rounded-full font-extrabold shadow-sm shadow-black absolute -top-3 -right-3">
              {totalNotifications}
            </span>
          )}
        </Link>
      </div>

      {/* Friend List Container */}
      <div className="friend-list-container">
        {loadFriends ? <PageLoader /> : <FriendCard friends={friends} />}
      </div>
    </div>
  );
};
