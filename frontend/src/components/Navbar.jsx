import { Link, useLocation, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { useFriendRequests } from "../contexts/FriendRequestContext";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
const Navbar = () => {
  const navigate = useNavigate();
  const shakeRef = useRef(null);
  const glowRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      shakeRef.current,
      { y: -0.3 },
      {
        y: 0.3,
        duration: 0.6,
        ease: "back.out(5.5)",
        repeat: -1,
        yoyo: true,
      }
    );
    gsap.fromTo(
      glowRef.current,
      { filter: "drop-shadow(2px 2px 1px #e624f8)", width: "16rem" },
      {
        filter: "none",
        width: "8rem",
        duration: 0.5,
        ease: "back.out(5.5) ",
      }
    );
  }, []);

  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const { incomingRequests, rejectedRequests } = useFriendRequests();

  const location = useLocation();
  const isNotificationPage = location.pathname === "/notification";

  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const prevCountRef = useRef(0);

  const totalNotifications =
    (incomingRequests?.length ?? 0) + (rejectedRequests?.length ?? 0);

  // 🔹 Load seen notifications from localStorage on first mount
  useEffect(() => {
    const savedSeenCount = localStorage.getItem("seenNotificationsCount");
    if (savedSeenCount) {
      prevCountRef.current = parseInt(savedSeenCount, 10);
    }
  }, []);

  useEffect(() => {
    //  If new notifications come (count increases)
    if (totalNotifications > prevCountRef.current) {
      setShowNotificationAlert(true);
    }

    //  If user is on notification page -> mark as seen
    if (isNotificationPage) {
      setShowNotificationAlert(false);
      prevCountRef.current = totalNotifications;
      localStorage.setItem(
        "seenNotificationsCount",
        totalNotifications.toString()
      );
    }
  }, [totalNotifications, isNotificationPage]);

  return (
    <nav
      className=" blender fixed top-0 z-4 flex w-full items-center justify-between bg-[url('/bg-common.webp')] bg-cover bg-center px-4 sm:px-8 md:px-12 lg:px-18 min-h-[8vh] md:min-h-[10vh] "
    >
      {/* nav - logo */}
      <div className="nav-logo text-black">
        <img
          ref={glowRef}
          src="/logo-svg.svg"
          alt="logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
          onClick={() => navigate("/")}
        />
      </div>

      {/* nav-links */}
      <div
        ref={shakeRef}
        className=" flex items-center gap-4 sm:gap-6 md:gap-8 text-white"
      >
        {/* notification link */}
        <Link to={"/notification"} className="relative">
          <img
            src="/bell-icon.webp"
            alt="bell icon"
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"
            title="Notifications"
          />
          {showNotificationAlert && (
            <span className="w-7 h-7 flex items-center justify-center bg-red-500 rounded-full font-extrabold shadow-sm shadow-black absolute bottom-3 left-3">
              {totalNotifications}
            </span>
          )}
        </Link>

        {/* profile link */}
        <Link to={"/onboarding"}>
          <img
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:max-w-[4rem] rounded-full object-cover"
            src={authUser?.profilePic}
            alt="profile image"
            title="Profile"
          />
        </Link>

        {/* logout link */}
        <Link onClick={logoutMutation}>
          <img
            src="/logout-icon.webp"
            alt="logout icon"
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20"
            title="Logout"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
