import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";

function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState("home");

  useEffect(() => {
    let tab = location.pathname.split("/")[2] || "home";
    setActive(tab);
    console.log(active);
  }, [location.pathname]);

  return (
    <div className="position-sticky top-0">
      <div className="sidebar bg-dark p-2 rounded-end-4 vh-100 shadow">
        <h2 className="text-white text-center pb-2 mt-3 border-bottom">
          Sidebar
        </h2>
        <div className="sidebar-items">
          <ul className="list-unstyled mt-3 text-white">
            <li
              className={`mx-2 p-1 my-3 ${active === "home" ? "active" : ""}`}
            >
              <Link to="/">
                <div className="content d-flex align-items-center">
                  <img src="/assets/home.svg" alt="" />
                  <p className="m-0 ms-2">Home</p>
                </div>
              </Link>
            </li>
            <li
              className={`mx-2 p-1 my-3 ${
                active === "show-all" ? "active" : ""
              }`}
            >
              <Link to="/user/show-all">
                <div className="content d-flex align-items-center">
                  <img src="/assets/dashboard.svg" alt="" />
                  <p className="m-0 ms-2">Show all</p>
                </div>
              </Link>
            </li>
            <li
              className={`mx-2 p-1 my-3 ${active === "create" ? "active" : ""}`}
            >
              <Link to="/user/create">
                <div className="content d-flex align-items-center">
                  <img src="/assets/create.svg" alt="" className="larger" />
                  <p className="m-0 ms-2">Create</p>
                </div>
              </Link>
            </li>
            <li
              className={`mx-2 p-1 my-3 ${active === "delete" ? "active" : ""}`}
            >
              <Link to="/user/delete">
                <div className="content d-flex align-items-center">
                  <img src="/assets/remove.svg" alt="" className="larger" />
                  <p className="m-0 ms-2">Delete</p>
                </div>
              </Link>
            </li>
            <li
              className={`mx-2 p-1 my-3 ${active === "update" ? "active" : ""}`}
            >
              <Link to="/user/update">
                <div className="content d-flex align-items-center">
                  <img src="/assets/update.svg" alt="" />
                  <p className="m-0 ms-2">Update</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
