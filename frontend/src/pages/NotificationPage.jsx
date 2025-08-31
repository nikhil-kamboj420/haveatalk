import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import NonotificationFound from "../components/NonotificationFound";
import PageLoader from "../components/PageLoader";
import { toast } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";

const NotificationPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState(null);

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptFriendReqMutation } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success(message);
      setLoadingId(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
      setLoadingId(null);
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div
      id="notificationwrapper"
      className="flex flex-col items-start gap-4 bg-blue-700"
    >
      {/* Notification Heading */}
      <div className="text-7xl">Notifications</div>

      {/* Incoming Friend Requests */}
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {incomingRequests.length > 0 && (
            <section className="min-w-[80%] bg-blue-950">
              <div className="text-2xl flex">
                <span>👤</span>
                <h2>Friend Requests</h2>
                <span>{incomingRequests.length}</span>
              </div>
              {incomingRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex justify-between items-center gap-7 bg-amber-900"
                >
                  <div className="flex justify-items-center items-center gap-7">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={request.sender.profilePic}
                      alt={request.sender.fullName}
                    />
                    <div>
                      <h3 className="text-2xl">{request.sender.fullName}</h3>
                      <button className="btn btn-secondary text-2xl">
                        Native : {request.sender.nativeLanguage}
                      </button>
                      <button className="btn btn-secondary text-2xl">
                        Learning : {request.sender.learningLanguage}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn btn-success text-2xl"
                      onClick={() => {
                        setLoadingId(request._id);
                        acceptFriendReqMutation(request._id);
                      }}
                      disabled={loadingId === request._id}
                    >
                      {loadingId === request._id ? "Accepting..." : "Accept"}
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}

      {/* Accepted Friend Requests (Notifications for Sender) */}
      <div className="min-w-[80%]">
        {acceptedRequests.length > 0 && (
          <section className=" bg-violet-600">
            <div className="text-2xl flex items-center gap-2">
              <span>🔔</span>
              <h2>New Connections</h2>
            </div>
            <div>
              {acceptedRequests.map((req) => {
                if (!authUser) return null;

                const isSender = req.sender._id === authUser._id;
                const friend = isSender ? req.recipient : req.sender;

                // Agar main (authUser) recipient tha aur maine accept kiya
                if (!isSender) {
                  return (
                    <h3 key={req._id} className="text-2xl font-bold">
                      You accepted friend request
                    </h3>
                  );
                }

                // Agar dusre bande ne accept kiya (main sender tha)
                return (
                  <div key={req._id} className="flex justify-between bg-black">
                    <div className="flex items-center gap-4">
                      <img
                        src={friend.profilePic}
                        alt={friend.fullName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="text-2xl">
                        <h3>{friend.fullName}</h3>
                        <p>{friend.fullName} accepted your friend request</p>
                        <p>🕛 Recently</p>
                      </div>
                    </div>
                    <span className="text-2xl">🗨️ New Friend</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NonotificationFound />
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
