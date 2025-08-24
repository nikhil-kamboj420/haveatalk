import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";

const useOboarding = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Profile  OnBoarded successfully !");
    },
    onError: (err) => {
      const data = err.response?.data;

      if (data?.missingFields && data?.missingFields.length > 0) {
        const message1 = `${data.message}`;
        const message2 = `${data.missingFields.join(", ")}`;
        toast.error(message2);
        toast.error(message1);
      } else {
        const message = data?.message || "Something went wrong";
        toast.error(message);
      }
    },
  });

  return { isPending: isPending, onboardingMutation: mutate };
};

export default useOboarding;
