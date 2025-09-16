import { Link, useLocation, useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect } from "react";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const { id: targetId } = useParams();
  const top_Menu =
    currentPath === `/friends/chat/${targetId}`
      ? ` top-[1.5vh] left-[20vw] z-[80]`
      : ` md:top-[11vh] md:left-4 md:z-[50] md:mt-10`;
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setShowSidebar(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowSidebar]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`fixed top-[1.5vh] left-[20vw] z-[80] ${top_Menu}  w-fit rounded-md border border-fuchsia-500 px-6 py-3 text-lg md:text-xl font-semibold hover:bg-fuchsia-500 hover:text-black transition text-white`}
        aria-label="Open sidebar"
        aria-expanded={showSidebar}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        ☰ Menu
      </button>

      {/* Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 z-[60] bg-black/50"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`text-2xl font-[dragrace] tracking-[.1rem] fixed top-[11vh] left-0 z-[70] h-[89vh] w-[20rem] font-light
        bg-[url('/bg-common.webp')] bg-cover bg-center
        text-white flex flex-col justify-between shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-2xl p-2 rounded-full hover:bg-white/10"
          onClick={() => setShowSidebar(false)}
        >
          ⪻
        </button>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setShowSidebar(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                currentPath === "/"
                  ? "bg-purple-700/40 border border-purple-400"
                  : "hover:bg-white/10"
              }`}
            >
              <img src="/home-icon.webp" alt="home" className="w-13 h-12" />
              <span>Home</span>
            </Link>

            <Link
              to="/friends"
              onClick={() => setShowSidebar(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                currentPath === "/friends"
                  ? "bg-purple-700/40 border border-purple-400"
                  : "hover:bg-white/10"
              }`}
            >
              <img
                src="/friends-icon.webp"
                alt="friends"
                className="w-14 h-10"
              />
              <span>Friends</span>
            </Link>

            <Link
              to="/notification"
              onClick={() => setShowSidebar(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                currentPath === "/notification"
                  ? "bg-purple-700/40 border border-purple-400"
                  : "hover:bg-white/10"
              }`}
            >
              <img src="/bell-icon.webp" alt="bell" className="w-10 h-10" />
              <span>Notifications</span>
            </Link>
          </nav>
        </div>

        {/* Profile Section */}
        <div className="bg-purple-900/80 px-4 py-3 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={authUser?.profilePic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">{authUser?.userName}</h2>
            <span className="text-green-300 text-xl font-[mori]">
              🟢 online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
