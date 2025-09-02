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
      <link rel="icon" href="https://flagcdn.com/24x18/in.png" />
      <div className="home-page min-h-[100vh]">
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
