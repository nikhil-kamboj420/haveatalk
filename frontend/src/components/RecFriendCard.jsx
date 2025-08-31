import { capitalize, getFlagUrlByLang } from "../lib/utils";

export const RecFriendCard = ({
  getRecUsers,
  outgoingReqsIds,
  sendFrdReqsMutation,
  isPending,
}) => {
  if (!getRecUsers || getRecUsers.length === 0) {
    return <h2 className="text-5xl"> No Friends Reccommendation </h2>;
  }
  return (
    <>
      {getRecUsers.map((user) => {
        const hasReqBeenSent = outgoingReqsIds.has(user._id);
        return (
          <div
            key={user._id}
            className="instance-wrapper flex flex-col  justify-center items-center gap-14 max-w-[30rem] min-h-[28rem] rounded-b-box bg-indigo-700 text-4xl"
          >
            <div className="flex  max-w-[80%] flex-wrap gap-4">
              <img
                src={user.profilePic}
                alt="profile photo"
                className="max-h-10 max-w-10 rounded-full "
              />
              <span>{user.fullName}</span>
              <span>📍{user.location}</span>
            </div>
            <div className="flex gap-4">
              <span className="btn btn-primary text-3xl">
                {
                  <img
                    src={getFlagUrlByLang(user.nativeLanguage)}
                    alt="flag image"
                  />
                }
                Native : {capitalize(user.nativeLanguage)}
              </span>
              <span className="btn btn-primary text-3xl">
                {
                  <img
                    src={getFlagUrlByLang(user.learningLanguage)}
                    alt="flag image"
                  />
                }
                Learning : {capitalize(user.learningLanguage)}
              </span>
            </div>
            <div>
              <p className="text-2xl">{user.bio}</p>
            </div>
            <div>
              <button
                className={`btn  text-4xl ${
                  hasReqBeenSent ? "btn-disabled" : "btn-secondary"
                } `}
                onClick={() => sendFrdReqsMutation(user._id)}
                disabled={hasReqBeenSent || isPending}
              >
                {!hasReqBeenSent ? (
                  <span>👤+ Send Friend Request</span>
                ) : (
                  <span>request sent</span>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};
