import React from "react";
import { Link, useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("jwt_token");
    navigate("/login");
  };

  return (
    <div className="navbar h-10 shadow-md shadow-blue-200">
      <div className="flex-1 h-10">
        <Link to={"/"} className="text-success mx-6 text-xl font-bold">
          E R P
        </Link>
      </div>
      <div className="flex-none h-10 gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full">
              <img className="h-10" src="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
