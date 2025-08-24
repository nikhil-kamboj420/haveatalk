import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  //* using a custom hook for loginMutation
  const {isPending, loginMutation } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);
    loginMutation(loginData);
  };
  return (
    <div id="loginWrapper">
      <div className="title-login">
        <h1>Login</h1>
        <i>🔐</i>
      </div>
      <div className="loginMainContainer">
        <div className="left">
          <div className="brand ">
            <h1 className="text-7xl">
              <i>🗣️</i>Haveatalk
            </h1>
            <h2>Welcome Back !</h2>
            <p>Sign in to your account to continue with Haveatalk </p>
          </div>

          <div className="loginForm-container">
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-outline btn-primary" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <span>
                <Link to="/signup">Create one</Link>
              </span>
            </p>
          </div>
        </div>

        <div className="right">
          <div className="img-container-login">
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

export default LoginPage;
