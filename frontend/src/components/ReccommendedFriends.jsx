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
    <div id="Rec-friend-wrapper">
      {/* ReccommendedFriends-title */}
      <div className="rec-title min-h-[15vh]">
        <h2 className="text-5xl">Meet New People</h2>
        <p className="text-2xl">Discover the people with the same interest!</p>
      </div>
      {/* friend-list-container */}

      <div className="rec-friend-list-container grid grid-cols-2 gap-12">
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
