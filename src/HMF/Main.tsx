import { useAuthState } from "react-firebase-hooks/auth";
import { TUserInfo } from "../types/Types";
import SendForm from "./components/SendForm";
import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { getFromLocalStorage } from "../utilities/functions";
import Table from "./components/Table";

export default function Main() {
  const [isRegistratedUser] = useAuthState(auth);
  const [players, setPlayers] = useState<TUserInfo[]>([]);
  useEffect(() => {
    setPlayers(getFromLocalStorage("unityPlayers"));
  }, []);
  const showRightData = (arr: TUserInfo[]) => {
    if (isRegistratedUser?.email === "a.harmash1208@gmail.com") return true;
    const condition = arr.find((player) => player.email === isRegistratedUser?.email);
    return condition;
  };
  return <>{showRightData(players) ? <Table /> : <SendForm />}</>;
}
