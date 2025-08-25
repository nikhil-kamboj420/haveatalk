import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logout Successfully !");
    },

    onError: (err) => {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });
  return { logoutMutation: mutate };
};

export default useLogout;
