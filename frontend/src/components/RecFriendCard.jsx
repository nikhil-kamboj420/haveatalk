import { capitalize, getFlagUrlByLang } from "../lib/utils";

export const RecFriendCard = ({
  getRecUsers,
  outgoingReqsIds,
  sendFrdReqsMutation,
  isPending,
}) => {
  if (!getRecUsers || getRecUsers.length === 0) {
    return (
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-white font-extrabold font-[dragrace] tracking-wider">
        No Friend Recommendations 😢
      </h2>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full font-[mori] tracking-[0.09rem]">
      {getRecUsers.map((user) => {
        const hasReqBeenSent = outgoingReqsIds.has(user._id);

        return (
          <div
            key={user._id}
            className="border-2 border-b-fuchsia-500 bg-transparent rounded-2xl shadow-lg p-6 flex flex-col items-center gap-6 transition-all duration-300 hover:scale-105 hover:shadow-fuchsia-500/50"
          >
            {/* Profile */}
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={user.profilePic}
                alt="profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-fuchsia-500 shadow-md"
              />
              <h3 className="text-xl font-extrabold text-white">
                {user.fullName}
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                📍 {user.location}
              </p>
            </div>

            {/* Languages */}
            <div className="flex flex-col sm:flex-row gap-3 text-xl md:text-base">
              <span className="flex items-center gap-2 bg-[#6742bc] text-white px-3 py-2 rounded-lg shadow-inner">
                <img
                  src={getFlagUrlByLang(user.nativeLanguage)}
                  alt="native flag"
                  className="w-5 h-5"
                />
                Native: {capitalize(user.nativeLanguage)}
              </span>
              <span className="flex items-center gap-2 bg-[#6742bc] text-white px-3 py-2 rounded-lg shadow-inner">
                <img
                  src={getFlagUrlByLang(user.learningLanguage)}
                  alt="learning flag"
                  className="w-5 h-5"
                />
                Learning: {capitalize(user.learningLanguage)}
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base  text-gray-300 text-center line-clamp-3">
              {user.bio}
            </p>

            {/* Friend Request Button */}
            <button
              onClick={() => sendFrdReqsMutation(user._id)}
              disabled={hasReqBeenSent || isPending}
              className={`mt-auto px-5 py-2 rounded-xl w-full font-medium shadow-md transition-colors flex items-center justify-center gap-2 ${
                hasReqBeenSent
                  ? "bg-gray-600 cursor-not-allowed text-gray-300"
                  : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
              }`}
            >
              {!hasReqBeenSent ? (
                <>
                  <img
                    src="/send-fre-req-icon.png"
                    alt="friend request"
                    className="w-6 h-6"
                  />
                  <span>Send Friend Request</span>
                </>
              ) : (
                <span>Request Sent</span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
