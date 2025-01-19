import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const linkClass =
    "text-gray-400 hover:text-white font-medium transition duration-300 px-4 py-2 rounded-md";

  const activeLinkClass =
    "text-white font-semibold bg-zinc-700 hover:bg-zinc-600";

  return (
    <nav className="flex text-white bg-zinc-800 flex-row justify-center py-4 shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeLinkClass : ""}`
        }
      >
        Pastes
      </NavLink>
    </nav>
  );
};

export default Nav;
