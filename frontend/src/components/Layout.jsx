import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="relative min-h-screen flex">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className="flex-1 flex flex-col">
            <Navbar setShowSidebar={setShowSidebar} />
            <main>{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
