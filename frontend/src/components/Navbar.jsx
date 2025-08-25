import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();

  const location = useLocation();
  const currentPath = location.pathname;
  const isChatPage = currentPath.startsWith("/chat");

  const { logoutMutation } = useLogout();
  return (
    <nav
      id="navbarwrapper"
      className="bg-[#1f8dc3] text-6xl   flex justify-between min-h-[7rem] "
    >
      {/* nav - logo */}
      {!isChatPage ? (
        <div className="nav-logo   bg-amber-400 text-black ">🗣️ Haveatalk</div>
      ) : (
        <div></div>
      )}

      {/* nav-links */}
      <div className="nav-links   bg-blue-800 text-white flex gap-8 items-center">
        {/* notification link */}
        <Link to={"/notification"}>🔔</Link>
        {/* theme link */}
        {/* // !onClick={showTheme}  */}
        <Link>
          <button>🎨</button>
        </Link>
        {/* profile link */}
        <Link to={"/onboarding"}>
          <img
            className="max-w-[4rem]"
            src={authUser?.profilePic}
            alt="profile image"
          />
        </Link>
        {/* logout link */}
        <Link onClick={logoutMutation}>⏻</Link>
      </div>
    </nav>
  );
};

export default Navbar;
