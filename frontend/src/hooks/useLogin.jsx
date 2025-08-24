import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login } from "../lib/api";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login  Successfully !");
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });

  return { isPending: isPending, loginMutation: mutate };
};

export default useLogin;

