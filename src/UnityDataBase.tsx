import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./HMF/Footer";
import Header from "./HMF/Header";
import Main from "./HMF/Main";
import "./css/newMain.css";
import "./css/newHeader.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, dataBase } from "./config/firebase";
import { useEffect } from "react";
import { Auth } from "./HMF/components/Auth";
import { later } from "./utilities/functions";
import { collection, getDocs } from "firebase/firestore";

export default function UnityDataBase() {
  const [isRegistratedUser] = useAuthState(auth);
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        // setIsLoading(true);
        await later(2500);
        const playersData = await getDocs(collection(dataBase, "players"));
        const players = playersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        localStorage.setItem("unityPlayers", JSON.stringify(players));
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    }
    getData();
  }, []);

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
