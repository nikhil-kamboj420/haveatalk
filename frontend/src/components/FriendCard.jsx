import { Link } from "react-router";
import { getFlagUrlByLang } from "../lib/utils";

export const FriendCard = ({ friends }) => {
  if (!friends || friends.length === 0)
    return <h2 className="text-5xl">You are Alone 😢 ,No Friends </h2>;

  return (
    <>
      {friends.map((friend) => (
        <div
          key={friend._id}
          className="instance-wrapper flex flex-col justify-center items-center gap-14 max-w-[20rem] min-h-[20rem] rounded-b-box bg-fuchsia-500 text-4xl"
        >
          {/* Profile */}
          <div className="flex gap-4">
            <img
              src={friend.profilePic}
              alt="profile photo"
              className="max-h-10 max-w-10 rounded-full "
            />
            <span>{friend.fullName}</span>
          </div>

          {/* Languages */}
          <div className="flex gap-4">
            <span className="btn btn-primary text-3xl">
              <img
                src={getFlagUrlByLang(friend.nativeLanguage)}
                alt="flag image"
                className="w-6 h-6 inline-block"
              />
              Native : {friend.nativeLanguage}
            </span>
            <span className="btn btn-primary text-3xl">
              <img
                src={getFlagUrlByLang(friend.learningLanguage)}
                alt="flag image"
                className="w-6 h-6 inline-block"
              />
              Learning : {friend.learningLanguage}
            </span>
          </div>

          {/* Chat Button */}
          <div>
            <Link
              to={`chat/${friend._id}`}
              className="btn btn-secondary text-4xl"
            >
              Message
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
