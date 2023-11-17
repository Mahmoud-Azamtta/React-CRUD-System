import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";
function Layout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row layout">
        <div className="col-lg-2 col-3 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-10 col-9 mx-auto">{children}</div>
      </div>
    </div>
  );
}

export default Layout;