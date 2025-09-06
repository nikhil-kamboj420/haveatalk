import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //* using a custom hook for loginMutation
  const { isPending, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <>
      <title>Login | HaveaTalk</title>
      <link rel="icon" href="/login-fav-icon.jpg" />

      <div className="gradient-magic relative grid min-h-screen  w-full place-content-center text-white">
        {/* Background iframe */}
        <iframe
          src="https://skybox.blockadelabs.com/e/22c2ca48a616bb81e52987d614c6571e"
          style={{ border: "0" }}
          allow="fullscreen"
          className="absolute inset-0 h-full w-full opacity-90"
        ></iframe>

        {/* Title */}
        <div className="relative z-50 flex items-center justify-center md:justify-start mt-3.5  text-3xl md:text-5xl font-bold mb-6 md:mb-8">
          <h1>Login</h1>
          <img
            src="/login-lock-icon.png"
            alt="lock icon"
            className="w-15 h-15"
          />
          <img
            src="/login-key-icon.png"
            alt="key icon"
            className="w-15 h-10 relative right-13"
          />
        </div>

        {/* Main Container */}
        <div className="relative z-50 flex flex-col md:flex-row items-center md:items-start  p-6 md:p-8 gap-10 md:gap-16 lg:gap-24 border-2 border-b-fuchsia-500 bg-black/40 rounded-2xl min-w-screen md:min-w-[60vw] my-4">
          {/* Left Side */}
          <div className="flex flex-col justify-start gap-6 md:gap-8 flex-1 w-full">
            {/* Branding */}
            <div className="brand text-center md:text-left">
              <div className="text-4xl md:text-7xl font-extrabold flex justify-center md:justify-start items-center gap-2">
                <img
                  src="/logo.png"
                  className="mx-auto md:mx-0 max-w-[15rem] md:max-w-[20rem]"
                  alt="logo"
                />
              </div>
              <h2 className="text-4xl md:text-4xl font-semibold  md:mt-4 font-[organical] text-[#e12afb]  tracking-widest">
                Welcome Back!
              </h2>
              <p className="text-base md:text-lg opacity-90 mt-2">
                Sign in to your account to continue with HaveaTalk
              </p>
            </div>

            {/* Form */}
            <div className="loginForm-container mt-6 w-full">
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-5 md:gap-6"
              >
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-2xl md:text-2xl">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="w-full text-2xl md:text-2xl border border-white bg-transparent px-3 py-4  rounded-md focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-2xl  md:text-2xl">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    className="w-full text-2xl md:text-2xl border border-white bg-transparent px-3 py-4 rounded-md focus:outline-none focus:border-fuchsia-500"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-4 w-full md:w-auto rounded-md border border-fuchsia-500 px-6 py-3 text-lg md:text-xl font-semibold hover:bg-fuchsia-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Signing in..." : "Sign In"}
                </button>

                {/* Signup link */}
                <p className="mt-6 text-base md:text-lg text-center md:text-left">
                  Don&apos;t have an account?{" "}
                  <span className="text-blue-500 font-semibold hover:underline">
                    <Link to="/signup">Create one</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center md:items-start justify-start flex-1 w-full  md:mt-0">
            <div className="img-container-login">
              <img
                src="./Conversation-cuate1.png"
                alt="Conversation image"
                className="h-auto max-w-[60vw] md:max-w-[20vw] mx-auto"
              />
            </div>
            <div className="ordinary-text mt-6 text-center md:text-left">
              <h2 className="text-lg md:text-2xl font-bold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm md:text-lg opacity-80 mt-2">
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

export default LoginPage;
