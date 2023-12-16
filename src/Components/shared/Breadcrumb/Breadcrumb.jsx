import React from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      const isLast = index === array.length - 1;

      return (
        <span key={index}>
          <Link to={path}>{isLast ? <span>{crumb}</span> : crumb}</Link>
          {!isLast && <span className="mx-2">/</span>}
        </span>
      );
    });

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li className="capitalize text-erp_primary">
        <Link to={"/"}>
            <AiTwotoneHome />
          </Link>
          <span className="mx-2">/</span>
          {crumbs}
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumb;
