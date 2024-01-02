import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./HMF/Footer";
import Header from "./HMF/Header";
import Main from "./HMF/Main";
import "./css/newMain.css";
import "./css/newHeader.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import { useEffect } from "react";
import { Auth } from "./HMF/components/Auth";

export default function UnityDataBase() {
  const [isRegistratedUser] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    async function signIn() {
      try {
        if (isRegistratedUser) {
          navigate("/");
        } else navigate("/Auth");
      } catch (err) {
        console.log(err);
      }
    }
    signIn();
  }, [isRegistratedUser, navigate]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <article>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Auth" element={<Auth />} />
          </Routes>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
