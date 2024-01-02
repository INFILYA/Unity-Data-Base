import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { TUserInfo } from "../../types/Types";
import { getFromLocalStorage } from "../../utilities/functions";

export default function Table() {
  const [isRegistratedUser] = useAuthState(auth);
  const [players, setPlayers] = useState<TUserInfo[]>([]);
  useEffect(() => {
    setPlayers(getFromLocalStorage("unityPlayers"));
  }, []);
  const isUserHaveProfile = (arr: TUserInfo[]): TUserInfo[] => {
    if (isRegistratedUser?.email === "a.harmash1208@gmail.com") return arr;
    if (arr.find((player) => player.email === isRegistratedUser?.email)?.position !== "coach") {
      return arr.filter((player) => player.email === isRegistratedUser?.email);
    } else
      return arr.filter(
        (player) =>
          player.team === arr.find((player) => player.email === isRegistratedUser?.email)?.team &&
          player.position !== "coach"
      );
  };
  return (
    <div>
      {isUserHaveProfile(players).map((player) => (
        <div key={player.firstName}>
          <div>{player.firstName}</div>
          <div>{player.position}</div>
        </div>
      ))}
    </div>
  );
}
