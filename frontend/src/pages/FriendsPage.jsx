import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendReqs,
  sendFriendReqs,
} from "../lib/api";
import { Friends } from "../components/Friends";
import { ReccommendedFriends } from "../components/ReccommendedFriends";
import toast from "react-hot-toast";

const FriendsPage = () => {
  const queryClient = useQueryClient();
  const [outgoingReqsIds, setOutgoingReqsIds] = useState(new Set());
  let { data: friends = [], isLoding: loadFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const { data: getRecUsers = [], isLoding: loadRecUsers } = useQuery({
    queryKey: ["getRecUsers"],
    queryFn: getRecommendedUsers,
  });
  const { data: getOutgoingFrdReqs } = useQuery({
    queryKey: ["getOutgoingFrdReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendFrdReqsMutation, isPending } = useMutation({
    mutationFn: sendFriendReqs,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["getOutgoingFrdReqs"] });
      toast.success(message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (getOutgoingFrdReqs && getOutgoingFrdReqs.length > 0) {
      getOutgoingFrdReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingReqsIds(outgoingIds);
    }
  }, [getOutgoingFrdReqs]);

  return (
    <>
      {" "}
      <title>Friends | HaveaTalk</title>
      <link rel="icon" href="/friends-fav-icon.png" />
      <div className="home-page min-h-screen  max-w-screen bg-[linear-gradient(130deg,rgb(14,9,24)_0%,#6742bc_50%,rgb(14,9,24)_100%)]  m-auto ">
        <Friends loadFriends={loadFriends} friends={friends} />
        <ReccommendedFriends
          loadRecUsers={loadRecUsers}
          getRecUsers={getRecUsers}
          outgoingReqsIds={outgoingReqsIds}
          sendFrdReqsMutation={sendFrdReqsMutation}
          isPending={isPending}
        />
      </div>
    </>
  );
};

export default FriendsPage;
