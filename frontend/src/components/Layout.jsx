import Navbar from "./Navbar"
import Sidebar from "./Sidebar"


const Layout = ({children,showSidebar =false}) => {
  return (
    <div>
        <div>
            {showSidebar && <Sidebar/>}
        </div>
        <div>
           <Navbar/>
           <main>
            {children}
           </main>
        </div>
    </div>
  )
}

export default Layout