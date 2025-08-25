import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser"

const Sidebar = () => {

  const {authUser} = useAuthUser();
 const location =  useLocation()
 const currentPath = location.pathname;
 
  return (
    <aside id="sidebarwrapper" className="max-w-[20vw] h-screen text-3xl  flex flex-col justify-between">
        <div className="box1  min-h-[93.6%] bg-gray-700 flex flex-col gap-[3rem]">
            <div className="side-logo bg-amber-800">
                🗣️ Haveatalk
            </div>
            <nav className="nav-tabs flex flex-col gap-7">
                <Link  to="/" className={currentPath==='/'? "active-tab": ""}>
                🏠Home
                </Link>
                <Link to="friends" className={currentPath==='/friends'? "active-tab": ""}>
                👥Friends
                </Link>
                <Link to="notifications" className={currentPath==='/notifications'? "active-tab": ""}>
                🔔Notifications
                </Link>
            </nav>
        </div>
        <div className="box2 bg-amber-800 flex gap-6">
           <div className="side-profile max-w-[2.3em]">
            <img src={authUser?.profilePic} alt="profile photo" />
           </div>
           <div className="flex flex-col ">
            <h2>{authUser?.fullName}</h2>
            <span>🟢 online</span>
           </div>
        </div>
    </aside>
  )
}

export default Sidebar