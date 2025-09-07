import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative min-h-screen flex">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar setShowSidebar={setShowSidebar} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
