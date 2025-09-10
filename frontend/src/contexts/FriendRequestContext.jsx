import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const FriendRequestContext = createContext();

export const FriendRequestProvider = ({ children }) => {
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const rejectedRequests = friendRequests?.rejectedReqs || [];

  const value = {
    incomingRequests,
    acceptedRequests,
    rejectedRequests,
    loading: isLoading,
  };

  return (
    <FriendRequestContext.Provider value={value}>
      {children}
    </FriendRequestContext.Provider>
  );
};

export const useFriendRequests = () => {
  const context = useContext(FriendRequestContext);
  if (!context) {
    throw new Error(
      "useFriendRequests must be used within a FriendRequestProvider"
    );
  }
  return context;
};
