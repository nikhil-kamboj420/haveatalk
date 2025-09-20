import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};
export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};
export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    console.log("Error in getAuthUser :", err);
    return null;
  }
};

export const completeOnboarding = async (formState) => {
  const res = await axiosInstance.post("/auth/onboarding", formState);
  return res.data;
};
export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};
export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};
export const sendFriendReqs = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
};
export const getFriendRequests = async () => {
  const res = await axiosInstance.get(`/users/friend-requests`);
  return res.data;
};

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friends-request/${requestId}/accept`);
  return response.data;
}
export async function rejectFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friends-request/${requestId}/reject`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
}
export async function sendUserMessage(userMessage) {
  const response = await axiosInstance.post(`/chat/bot/message`, userMessage);
  return response.data;
}