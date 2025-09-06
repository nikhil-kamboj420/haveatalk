import { useState } from "react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, signupMutation } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <>
      <title>Signup | HaveaTalk</title>
      <link rel="icon" href="/signup-fav-icon.jpg" />

      <div className="gradient-magic relative grid min-h-screen w-full place-content-center text-white">
        {/* Background */}
        <iframe
          src="https://skybox.blockadelabs.com/e/22c2ca48a616bb81e52987d614c6571e"
          style={{ border: "0" }}
          allow="fullscreen"
          className="absolute inset-0 h-full w-full opacity-90"
        ></iframe>

        {/* Main Container */}
        <div className="relative z-50 flex flex-col md:flex-row items-center md:items-start w-full max-w-7xl border-2 border-b-fuchsia-500 bg-black/40 p-6 md:px-5 gap-1  lg:gap-32 rounded-2xl my-4 ">
          {/* Left Side */}
          <div className="flex flex-col justify-start   flex-1 w-full">
            <div className="brand text-center md:text-left">
              <img
                src="/logo.png"
                className="mx-auto md:mx-0  max-w-[15rem] md:max-w-[20rem]"
                alt="logo"
              />
              <h2 className=" text-4xl md:text-4xl font-[organical] tracking-widest text-[#e130f9cd] font-extrabold">
                Create an Account
              </h2>
              <p className="text-base md:text-lg mt-2">
                Join HaveaTalk and start your language Chatterverse!
              </p>
            </div>

            {/* Form */}
            <div className="signUpForm-container mt-6 w-full">
              <form onSubmit={handleSignup} className="flex flex-col gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-2xl md:text-2xl mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    className="w-full rounded-md border border-white bg-transparent px-3 py-4 text-2xl md:text-2xl focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-2xl md:text-2xl mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    className="w-full rounded-md border border-white bg-transparent px-3 py-4 text-2xl md:text-2xl focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-2xl md:text-2xl mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    className="w-full rounded-md border border-white bg-transparent px-3 py-4 text-2xl  md:text-2xl focus:outline-none focus:border-fuchsia-500"
                  />
                  <p className="text-base md:text-sm opacity-80 mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className=" h-5 w-10 accent-fuchsia-500"
                  />
                  <p className="text-base md:text-sm ">
                    I agree to the{" "}
                    <span className="text-blue-500">terms of service</span> and{" "}
                    <span className="text-blue-500">privacy policy</span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 rounded-md border border-fuchsia-500 px-6 py-3 text-lg md:text-xl font-semibold hover:bg-fuchsia-500 hover:text-white transition"
                >
                  {isPending ? "Signing up..." : "Create Account"}
                </button>

                {/* Already have account */}
                <p className="mt-2 text-base md:text-lg text-center md:text-left">
                  Already have an account?{" "}
                  <span className="text-blue-500 font-semibold hover:underline">
                    <Link to="/login">Sign in</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-start justify-center flex-1 w-full  md:mt-0">
            <div className="img-container-signup">
              <img
                src="./Conversation-cuate1.png"
                alt="Conversation image"
                className="h-auto max-w-[60vw]  md:max-w-[20vw] mx-auto"
              />
            </div>
            <div className="ordinary-text mt-6 text-center md:text-left">
              <h2 className="text-3xl md:text-2xl font-bold">
                Connect with language partners worldwide
              </h2>
              <p className="text-2xl md:text-lg opacity-80 mt-2">
                Practice conversation, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
