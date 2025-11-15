import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme,toggleMenu } from "../../redux/slices/uiSlice";
import { Moon, Sun, ArrowBigDownDash, Menu,X} from "lucide-react";
import profile from "./../../assets/profile.jpeg";
const Nav = function () {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const menu = useSelector(state => state.ui.menuOpen);

  const lightCss = {
    backgroundColor: "rgba(255, 255, 255, 1)",
  };
  const darkCss = {
    backgroundColor: "#00000000",
  };

  const resumeBtnStyleDark = {
    color: "white",
    backgroundColor: "rgb(50 61 214)",
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenuToggle = () => {
    dispatch(toggleMenu());
  };

  

  const moonColor = theme === "light" ? "#1e1e1e" : "#6ea0ff";
  const sunColor = theme === "light" ? "#f2c20d" : "#ffffff";

  const navColor =
    theme === "light" ? "rgba(25, 25, 25, 0.6)" : "rgba(255, 255, 255, 0.71)";

  return (
    <nav style={theme === "light" ? lightCss : darkCss}>
      <div
        className="nav-container"
        style={theme === "light" ? lightCss : darkCss}
      >
        <div className="logo">
          <img src={profile} alt="" />
          <h1
            className="momo-trust-display-regular"
            style={theme === "light" ? { color: "black" } : { color: "white" }}
          >
            Sha<span id="reverse-r">r</span>ath
          </h1>
        </div>
        <div className="navigation">
          <div
            className="momo-trust-display-regular navigators"
            style={{ color: navColor }}
          >
            About
          </div>

          <div
            className="momo-trust-display-regular navigators"
            style={{ color: navColor }}
          >
            Projects
          </div>
          <div
            className="momo-trust-display-regular navigators"
            style={{ color: navColor }}
          >
            Contact
          </div>
        </div>
        <div className="resume">
          <button id="theme-changer" onClick={handleThemeToggle}>
            {theme === "light" ? (
              <Moon stroke={moonColor} size={22} />
            ) : (
              <Sun stroke={sunColor} size={22} />
            )}
          </button>
          <ResumeDownloadBtn />
        </div>

        {/* mobile view */}
        <div className="navbar-mobile">
          
          <ResumeDownloadBtn />
          <button id="menu-btn" onClick={handleMenuToggle}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

function ResumeDownloadBtn() {
  const resumeBtnStyleLight = {
    color: "white",
    backgroundColor: "black",
  };

  const resumeBtnStyleDark = {
    color: "white",
    backgroundColor: "rgb(50 61 214)",
  };

  const theme = useSelector((state) => state.ui.theme);
  return (
    <button
      id="resume-btn"
      style={theme === "light" ? resumeBtnStyleLight : resumeBtnStyleDark}
    >
      <ArrowBigDownDash />
      <span className="momo-trust-display-regular">Resume</span>
    </button>
  );
}

export default Nav;
