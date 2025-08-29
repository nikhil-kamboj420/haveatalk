import { Link } from "react-router";
import PageLoader from "./PageLoader";
import { FriendCard } from "./FriendCard";

export const Friends = ({loadFriends,friends}) => {
  return (
    <div id="friendwrapper" className="min-h-[40vh]">
        {/* friend-title */}
        <div className="friend-title text-5xl flex justify-between items-center min-h-[10vh]">
        <h1>Friends</h1> 
        <Link to="/notification" className="btn btn-primary text-2xl"><span>👥</span>Friend Requests</Link>
        </div>
        {/* friend-list-container */}
        <div className="friend-list-container">
           {loadFriends ? <PageLoader/> :
           <FriendCard friends={friends}/>}
        </div>
    </div>
  )
}

