import { Route, Routes } from "react-router-dom";
import Footer from "./HMF/Footer";
import Header from "./HMF/Header";
import Main from "./HMF/Main";
import "./css/newMain.css";

export default function UnityDataBase() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <article>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </article>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
