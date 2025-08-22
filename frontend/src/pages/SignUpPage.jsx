import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();
  const { mutate: signupMutation, isPending } = useMutation({
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

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signupData);
    signupMutation(signupData);
  };

  return (
    <div id="signUpWrapper">
      <div className="mainContainer">
        <div className="left">
          <div className="brand ">
            <h1 className="text-7xl">
              <i>🗣️</i>Haveatalk
            </h1>
            <h2>Create an Account</h2>
            <p>Join Haveatalk and start your language Chatterverse!</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSignup}>
              {/* Full Name */}
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setSignupData({ ...signupData, fullName: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                />
                <p>Password must be at least 6 characters long</p>
              </div>
              {/* service and privacy policy checkbox */}
              <div>
                <input type="checkbox" name="checkbox" id="checkbox" />
                <p>
                  I agree to the <span>terms of service</span> and{" "}
                  <span>privacy policy</span>
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-outline btn-primary">
                {isPending ? "Signing..." : "Create Account"}
              </button>
            </form>
          </div>
          <div>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/login">Sign in</Link>
              </span>
            </p>
          </div>
        </div>

        <div className="right">
          <div className="img-container-signup">
            <img src="./Conversation-cuate.png" alt="Conversation image" />
          </div>
          <div className="ordinary-text">
            <h2>Connect with language partners worldwide</h2>
            <p>
              Practice conversation, make friends, and improve your language
              skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
