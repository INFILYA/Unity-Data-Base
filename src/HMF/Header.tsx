import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-background"></div>
      <div className="barWrapper">
        <div className="innerContainer">
          <div className="titleNavWrapper">
            <div className="logo">
              <NavLink to={"/"}>
                <div className="my-logo-wrapper-header">
                  <img src="photos/UnityLogo.png" alt="" />
                </div>
              </NavLink>
            </div>
          </div>
          <div className="navbar-wrapper">
            <nav>
              <NavLink to={"/"}>My Profile</NavLink>
              <NavLink to={"/"}>Registration Form</NavLink>
            </nav>
          </div>
          <div className="actions">
            <div className="social">
              <a href="https://www.instagram.com/unityvball/" className="instagram">
                <img alt="" src="/photos/instagram.jpg"></img>
              </a>
              <a href="https://www.facebook.com/unityvball">
                <img alt="" src="/photos/facebook.jpg"></img>
              </a>
              <a href="https://www.youtube.com/channel/UC1IBZsYfkkOhisjKVlNQQIw">
                <img alt="" src="/photos/youtube.jpg"></img>
              </a>
              <a href="https://twitter.com/UnityVballClub">
                <img alt="" src="/photos/twitter.png"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
