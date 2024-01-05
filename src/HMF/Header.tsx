import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { auth } from "../config/firebase";
import Button from "../utilities/Button";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Header() {
  const [isRegistratedUser] = useAuthState(auth);
  if (isRegistratedUser?.photoURL === null) return;

  async function logout() {
    try {
      await signOut(auth);
      
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <div className="header-background"></div>
      <div className="barWrapper">
        <div className="innerContainer">
          <div className="titleNavWrapper">
            <div className="logo">
              <NavLink to={"/"}>
                <img src="photos/UnityLogoCuted.png" alt="" className="unity-image" />
                {isRegistratedUser ? (
                  <div className="photoUrl-displayName-wrapper">
                    <img src={isRegistratedUser?.photoURL} alt="" />
                    <div>{isRegistratedUser?.displayName || isRegistratedUser?.email} {}</div>
                  </div>
                ) : (
                  <div className="my-logo-wrapper-header">
                    <img src="photos/UnityLogo.png" alt="" />
                  </div>
                )}
              </NavLink>
            </div>
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
            {isRegistratedUser && (
              <div className="logout-button-wrapper">
                <Button onClick={logout} text="Log out" type="button" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
