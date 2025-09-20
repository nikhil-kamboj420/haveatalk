import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, rejectFriendRequest } from "../lib/api";
import NonotificationFound from "../components/NonotificationFound";
import PageLoader from "../components/PageLoader";
import { toast } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { useFriendRequests } from "../contexts/FriendRequestContext";
import { capitalize } from "../lib/utils";

const NotificationPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState(null);
  const { incomingRequests, acceptedRequests, rejectedRequests, loading } =
    useFriendRequests();

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

  const { mutate: rejectFriendReqMutation } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success(message);
      setLoadingId(null);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message, err?.response?.data?.error);
      setLoadingId(null);
    },
  });

  return (
    <>
      <title>Notification | HaveaTalk</title>
      <link rel="icon" href="/notification-fav-icon.webp" />
      <div className="min-h-screen  lg:mt-[10vh]  xl:mt-[10vh]  max-w-screen  bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]">
        <div
          className=" md:max-w-[80vw] mx-auto relative  flex flex-col  text-white font-[mori]   md:mt-[10vh] bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]"
        >
          {/* Notification Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-center mt-[10vh] bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
            🔔 Notifications
          </h1>

          {/* Incoming Friend Requests */}
          {loading ? (
            <PageLoader />
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <section className=" w-[80%] my-10 mx-auto p-6 rounded-2xl border-2 border-b-fuchsia-500 bg-transparent shadow-lg">
                  <div className="flex items-center gap-3 mb-6 text-2xl font-bold">
                    <span>👤</span>
                    <h2 className="text-white">Friend Requests</h2>
                    <span className="text-fuchsia-400">
                      {incomingRequests.length}
                    </span>
                  </div>
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="flex justify-between items-center p-4 mb-4 rounded-xl bg-[#1a1a1a] shadow-md hover:shadow-fuchsia-500/50 transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          className="w-14 h-14 rounded-full border-2 border-fuchsia-500 shadow-md"
                          src={request?.sender.profilePic}
                          alt={capitalize(request?.sender.userName)}
                        />
                        <div>
                          <h3 className="text-xl font-extrabold">
                            {capitalize(request?.sender.userName)}
                          </h3>
                          <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <button className="px-3 py-1 rounded-lg bg-[#6742bc] text-white text-sm shadow-inner">
                              Native: {request?.sender.nativeLanguage}
                            </button>
                            <button className="px-3 py-1 rounded-lg bg-[#6742bc] text-white text-sm shadow-inner">
                              Learning: {request?.sender.learningLanguage}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md transition-colors"
                          onClick={() => {
                            setLoadingId(request?._id);
                            acceptFriendReqMutation(request?._id);
                          }}
                          disabled={loadingId === request?._id}
                        >
                          {loadingId === request?._id
                            ? "Accepting..."
                            : "Accept"}
                        </button>
                        <button
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
                          onClick={() => {
                            setLoadingId(request?._id);
                            rejectFriendReqMutation(request?._id);
                          }}
                          disabled={loadingId === request?._id}
                        >
                          {loadingId === request?._id
                            ? "Rejecting..."
                            : "Reject"}
                        </button>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </>
          )}

          {/* Accepted Friend Requests */}
          {acceptedRequests.length > 0 && (
            <section className=" w-[80%] my-10 mx-auto p-6 rounded-2xl border-2 border-b-fuchsia-500 bg-transparent shadow-lg">
              <div className="text-2xl flex items-center gap-3 mb-6 font-bold">
                <span>🤗</span>
                <h2 className="text-white">New Connections</h2>
              </div>
              {acceptedRequests.map((req) => {
                if (!authUser) return null;
                const isSender = req?.sender?._id === authUser._id;
                const friend = isSender ? req?.recipient : req?.sender;

                return (
                  <div
                    key={req?._id}
                    className="flex justify-between items-center p-4 mb-4 rounded-xl bg-[#1a1a1a] shadow-md hover:shadow-fuchsia-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={friend?.profilePic}
                        alt={capitalize(friend?.userName)}
                        className="w-12 h-12 rounded-full border-2 border-fuchsia-500 shadow-md"
                      />
                      <div>
                        <h3 className="text-xl font-extrabold">
                          {capitalize(friend?.userName)}
                        </h3>
                        <p className="text-gray-400">
                          {isSender
                            ? `${capitalize(friend?.userName)} accepted your friend request`
                            : `You accepted ${capitalize(friend?.userName)}'s friend request`}
                        </p>
                        <p className="text-sm text-gray-500">🕛 Recently</p>
                      </div>
                    </div>
                    <span className="text-xl text-fuchsia-400">
                      🗨️ New Friend
                    </span>
                  </div>
                );
              })}
            </section>
          )}

          {/* Rejected Friend Requests */}
          {rejectedRequests.length > 0 && (
            <section className=" w-[80%] my-10  mx-auto p-6 rounded-2xl border-2 border-b-fuchsia-500 bg-transparent shadow-lg">
              <div className="text-2xl flex items-center gap-3 mb-6 font-bold">
                <span>❌</span>
                <h2 className="text-white">Rejected Requests</h2>
              </div>
              {rejectedRequests.map((req) => {
                if (!authUser) return null;
                const isSender = req.sender._id === authUser._id;
                const friend = isSender ? req.recipient : req.sender;

                return (
                  <div
                    key={req._id}
                    className="flex justify-between items-center p-4 mb-4 rounded-xl bg-[#1a1a1a] shadow-md hover:shadow-fuchsia-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={friend.profilePic}
                        alt={capitalize(friend.userName)}
                        className="w-12 h-12 rounded-full border-2 border-fuchsia-500 shadow-md"
                      />
                      <div>
                        <h3 className="text-xl font-extrabold">
                          {capitalize(friend.userName)}
                        </h3>
                        <p className="text-gray-400">
                          {isSender
                            ? `${capitalize(friend.userName)} rejected your friend request`
                            : `You rejected ${capitalize(friend.userName)}'s friend request`}
                        </p>
                        <p className="text-sm text-gray-500">🕛 Recently</p>
                      </div>
                    </div>
                    <span className="text-xl text-red-400">
                      🚫 Request Rejected
                    </span>
                  </div>
                );
              })}
            </section>
          )}

          {/* No Notification Fallback */}
          {incomingRequests.length === 0 &&
            acceptedRequests.length === 0 &&
            rejectedRequests.length === 0 && <NonotificationFound />}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
