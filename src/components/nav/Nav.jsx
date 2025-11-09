import "./nav.css";

const Nav = function () {
  return (
    <nav>
      <div id="nav-container">
        <div id="nav-name-contianer" className="momo-trust-display-regular">
          <span>S</span>
          <span>h</span>
          <span>a</span>
          <span>r</span>
          <span>a</span>
          <span>t</span>
          <span>h</span>
        </div>
        <div id="navigation-container">
          <h5 className="momo-trust-display-regular">About</h5>
          <h5 className="momo-trust-display-regular">Projects</h5>
          <h5 className="momo-trust-display-regular">Contact</h5>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
