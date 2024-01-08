import { useAuthState } from "react-firebase-hooks/auth";
import { TUserInfo } from "../types/Types";
import SendForm from "./components/SendForm";
import { auth } from "../config/firebase";
import Table from "./components/Table";
import { useSelector } from "react-redux";
import { selectPlayers } from "../states/slices/playersSlice";

export default function Main() {
  const [isRegistratedUser] = useAuthState(auth);
  const players = useSelector(selectPlayers);

  const showRightData = (arr: TUserInfo[]) => {
    const condition = arr.find((player) => player.email === isRegistratedUser?.email);
    console.log(condition?.team);

    return condition;
  };

  return <>{showRightData(players) ? <Table /> : <SendForm />}</>;
}
