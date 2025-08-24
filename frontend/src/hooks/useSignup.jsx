import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup } from "../lib/api";

const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("You are signup successfully !");
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });

  return { isPending: isPending, signupMutation: mutate };
};

export default useSignup;
