import React, { useState } from "react";
import "./Nav.css";
import Img from "../img/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import Burger from "./Burger";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { setAuth } from "../Slice/Slice";

export default function Nav() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch();

  const toggleHamburger = () => {
    setHamburgerIsOpen(!hamburgerIsOpen);
  };

  const handleLogout = () => {
    dispatch(setAuth(false)); // Dispatch the logout action
    navigate("/",{replace:true}); // Redirect to home after logout
  };

  return (
    <div>
      <div id="nav">
        <div className="burger-list" onClick={toggleHamburger}>
          <Burger isOpen={hamburgerIsOpen} />
        </div>
        <div className="figure">
          <img src={Img} alt="Logo" />
        </div>
        <div className="header-title">
          <span className="sub-lead">
            <GiTakeMyMoney />
          </span>
          Expense Tracker
        </div>
        <div
          className={`nav-list ${hamburgerIsOpen ? "nav-burger active" : ""}`}
        >
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" activeClassName="active">
                Manage Expenses
              </NavLink>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
