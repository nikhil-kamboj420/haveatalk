import { Link } from "react-router";
import { getFlagUrlByLang } from "../lib/utils";

export const FriendCard = ({ friends }) => {
  if (!friends || friends.length === 0) {
    return (
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-white font-extrabold font-[dragrace] tracking-wider">
        You are Alone 😢 , No Friends
      </h2>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full font-[mori] tracking-[0.09rem]">
      {friends.map((friend) => (
        <div
          key={friend._id}
          className="border-2 border-b-fuchsia-500 bg-transparent rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105 hover:shadow-fuchsia-500/50"
        >
          {/* Profile */}
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src={friend.profilePic}
              alt="profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-fuchsia-500 shadow-md"
            />
            <h3 className="text-xl font-extrabold text-white">
              {friend.fullName}
            </h3>
            <p className="text-xl text-gray-400 line-clamp-2">{friend.bio}</p>
          </div>

          {/* Languages */}
          <div className="flex flex-col sm:flex-row gap-3 text-xl md:text-base">
            <span className="flex items-center gap-2 bg-[#6742bc] text-white px-3 py-2 rounded-lg shadow-inner">
              <img
                src={getFlagUrlByLang(friend.nativeLanguage)}
                alt="native flag"
                className="w-5 h-5"
              />
              Native: {friend.nativeLanguage}
            </span>
            <span className="flex items-center gap-2 bg-[#6742bc] text-white px-3 py-2 rounded-lg shadow-inner">
              <img
                src={getFlagUrlByLang(friend.learningLanguage)}
                alt="learning flag"
                className="w-5 h-5"
              />
              Learning: {friend.learningLanguage}
            </span>
          </div>

          {/* Chat Button */}
          <Link
            to={`chat/${friend._id}`}
            className="mt-auto px-5 py-2 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium shadow-md transition-colors"
          >
            💬 Message
          </Link>
        </div>
      ))}
    </div>
  );
};
