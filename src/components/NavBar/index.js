import React from "react";
import "./css/style.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Context from "../../Context";
import { useRef } from "react";

function Navbar() {
  let location = useLocation();
  const [darkMode, setdarkMode] = useState();
  const refa = useRef(null)
  console.log(refa.current)
  return (
    <Context.Provider value >
      <nav>
        <div className="logo">Brand</div>
        <input type="checkbox" name="" id="click" />
        <label htmlFor="click">
          <MenuRoundedIcon className="menu-btn" />
        </label>
        <ul>
          <li>
            <Link className={location.pathname == "/" ? "active" : null} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname == "/contact" ? "active" : null}
              to="/contact"
            >
              contact
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname == "/products" ? "active" : null}
              to="/products"
            >
              products
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname == "/about" ? "active" : null}
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <div className="form-check form-switch">
              <input
                className="form-check-input mt-1"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                ref={refa}
              />
              <label
                className="form-check-label dark"
                htmlFor="flexSwitchCheckChecked"
              >
                Dark Mode
              </label>
            </div>
          </li>
        </ul>
      </nav>
    </Context.Provider>
  );
}

export default Navbar;
