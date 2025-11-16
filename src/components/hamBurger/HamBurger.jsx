import React from "react";
import "./hamburger.css";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/uiSlice";
import {Moon, Sun} from "lucide-react";
const HamBurger = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.ui.menuOpen);
  const theme = useSelector((state) => state.ui.theme);

  const toggleCss = menu ? { right: "0" } : { right: "100%" };

  const lightCss = {
    backgroundColor: "rgba(255, 255, 255, 1)",
  };
  const darkCss = {
    backgroundColor: "#0b0b0cff",
  };

  const themeCss =
    theme === "dark"
      ? darkCss
      : lightCss;

  const navColor =
    theme === "light" ? "rgba(25, 25, 25, 0.6)" : "rgba(255, 255, 255, 0.71)";

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  const moonColor = theme === "light" ? "#1e1e1e" : "#6ea0ff";
  const sunColor = theme === "light" ? "#f2c20d" : "#ffffff";


  

  return (
    <menu className="hamburger" style={{ ...toggleCss, ...themeCss }}>
      <div className="HamBurger-navigators">
        <div className="momo-trust-display-regular" style={{ color: navColor }}>
          About
        </div>

        <div className="momo-trust-display-regular" style={{ color: navColor }}>
          Projects
        </div>
        <div className="momo-trust-display-regular" style={{ color: navColor }}>
          Contact
        </div>
      </div>
      <button id="theme-changer-hamburger" onClick={handleThemeToggle}>
        {theme === "light" ? (
          <Moon stroke={moonColor} size={22} />
        ) : (
          <Sun stroke={sunColor} size={22} />
        )}
      </button>
    </menu>
  );
};

export default HamBurger;
