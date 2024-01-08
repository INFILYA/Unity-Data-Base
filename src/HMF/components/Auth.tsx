import { auth, googleProvider } from "../../config/firebase";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import SectionWrapper from "../../wpappers/SectionWrapper";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../utilities/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { checkUserEmail } from "../../utilities/functions";

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [isRegistratedUser] = useAuthState(auth);
  const [email, setEmail] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    async function signInWithEmail() {
      try {
        if (isRegistratedUser) {
          navigate("/");
        } else {
          if (isSignInWithEmailLink(auth, window.location.href)) {
            await signInWithEmailLink(
              auth,
              localStorage.getItem("userEmailUnity")!,
              window.location.href
            );
            localStorage.removeItem("userEmailUnity");
          }
        }
      } catch (err) {
        console.log(err);
        navigate("/Auth");
      }
    }
    signInWithEmail();
  }, [isRegistratedUser, navigate, search]);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoginLoading(true);
      // ПОмеНЯТЬ ЛиНКДОМАИН !!!
      await sendSignInLinkToEmail(auth, email, {
        url: "https://gameplancreator-ts.web.app/Auth",
        handleCodeInApp: true,
        dynamicLinkDomain: "gameplancreatorts.page.link",
      });
      localStorage.setItem("userEmail", email);
      alert("We have sent you link on email");
      setLoginError("");
    } catch (err) {
      console.error(err);
      setLoginError(err as string);
    } finally {
      setIsLoginLoading(false);
    }
  }

  return (
    <SectionWrapper
      content={
        <form className="emailPanel" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Button
              type="submit"
              text={isLoginLoading ? "Logging you in" : "Log in"}
              disabled={checkUserEmail(email)}
            />
            <div>{loginError}</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="button" className="google" onClick={signInWithGoogle}>
                <img src="/photos/google.jpg" alt="" />
              </button>
            </div>
          </div>
        </form>
      }
    />
  );
}
