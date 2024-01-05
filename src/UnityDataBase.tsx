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
import { collection, getDocs } from "firebase/firestore";
import { getFromLocalStorage, later } from "./utilities/functions";
import { useAppDispatch } from "./states/store";
import { setPlayers } from "./states/slices/playersSlice";
import { TUserInfo } from "./types/Types";

export default function UnityDataBase() {
  const [isRegistratedUser] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  // ПРОБЛЕМА!!! 
  useEffect(() => {
    async function getData() {
      try {
        await later(1000);
        if (getFromLocalStorage("unityPlayerInfo")) {
          const choosenTeam = getFromLocalStorage("unityPlayerInfo");
          const playersData = await getDocs(collection(dataBase, choosenTeam?.team));
          const players = playersData.docs.map((doc) => doc.data());
          dispatch(setPlayers(players as TUserInfo[]));
          // localStorage.setItem("unityPlayers", JSON.stringify(players));
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [dispatch]);

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
