import PageLoader from "./PageLoader";
import { RecFriendCard } from "./RecFriendCard";

export const ReccommendedFriends = ({
  loadRecUsers,
  getRecUsers,
  outgoingReqsIds,
  sendFrdReqsMutation,
  isPending,
}) => {
  return (
    <div
      id="Rec-friend-wrapper"
      className="min-h-[40vh] px-4 md:px-10 py-8 max-w-[80vw]   mx-auto  bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]"
    >
      {/* Title */}
      <div className="rec-title text-center mb-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-[#6742bc] bg-clip-text text-transparent font-[dragrace]">
          Meet New People
        </h2>
        <p className="text-base md:text-lg text-gray-400 mt-2">
          Discover people with the same interests!
        </p>
      </div>

      {/* Friend List */}
      <div className="rec-friend-list-container">
        {loadRecUsers ? (
          <PageLoader />
        ) : (
          <RecFriendCard
            getRecUsers={getRecUsers}
            outgoingReqsIds={outgoingReqsIds}
            sendFrdReqsMutation={sendFrdReqsMutation}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
};
