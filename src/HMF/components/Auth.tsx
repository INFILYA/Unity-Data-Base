import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import SectionWrapper from "../../wpappers/SectionWrapper";
import { FormEvent } from "react";

export function Auth() {
  async function signInWithGoogle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <SectionWrapper
      content={
        <form className="emailPanel" onSubmit={signInWithGoogle}>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" className="google">
                <img src="/photos/google.jpg" alt="" />
              </button>
            </div>
          </div>
        </form>
      }
    />
  );
}
