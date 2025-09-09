import { Link } from "react-router";
import PageLoader from "./PageLoader";
import { FriendCard } from "./FriendCard";

export const Friends = ({ loadFriends, friends }) => {
  return (
    <div
      id="friendwrapper"
      className="min-h-[40vh] px-4 md:px-10 py-8 max-w-[80vw]  my-[10vh] mx-auto  bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]"
    >
      {/* Friend Title */}
      <div className="friend-title text-3xl md:text-4xl lg:text-5xl font-bold flex justify-between items-center mb-8">
        <h1 className="bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
          Friends
        </h1>
        <Link
          to="/notification"
          className="px-4 py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-lg md:text-xl flex items-center gap-2 shadow-md transition-colors"
        >
          👥 Friend Requests
        </Link>
      </div>

      {/* Friend List Container */}
      <div className="friend-list-container">
        {loadFriends ? <PageLoader /> : <FriendCard friends={friends} />}
      </div>
    </div>
  );
};
