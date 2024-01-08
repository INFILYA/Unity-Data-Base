import { useSelector } from "react-redux";
import { selectPlayers, setPlayers } from "../../../states/slices/playersSlice";
import { useEffect, useState } from "react";
import { TUserInfo } from "../../../types/Types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../utilities/Button";
import { dataBase } from "../../../config/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import SectionWrapper from "../../../wpappers/SectionWrapper";
import { useAppDispatch } from "../../../states/store";

export default function PlayerInfo() {
  const players = useSelector(selectPlayers);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const myParam = searchParams.get("player");
  const [playerInfo, setPlayerInfo] = useState<TUserInfo | null>(null);

  useEffect(() => {
    const playerInformation = players.find((player) => player.email === myParam);
    if (!playerInformation) return;
    setPlayerInfo(playerInformation);
  }, [players, myParam]);

  const deletePlayerProfile = async () => {
    // Видаляю гравця
    const id = `${playerInfo?.firstName} ${playerInfo?.lastName} ${playerInfo?.position} #${playerInfo?.number}`;
    const playerDoc = doc(dataBase, playerInfo!.team, id);
    await deleteDoc(playerDoc);
    // і одразу підгружаю нових гравців
    const playersData = await getDocs(collection(dataBase, playerInfo!.team));
    const players = playersData.docs.map((doc) => doc.data());
    dispatch(setPlayers(players as TUserInfo[]));
    navigate("/");
  };

  //   const updatePlayerProfile = async () => {
  //     const playerDoc = doc(dataBase, playerInfo!.team, playerInfo!.email!);
  //     await updateDoc(playerDoc , );
  //   };

  if (playerInfo === null) return;

  return (
    <SectionWrapper
      content={
        <div className="playerInfo-wrapper">
          <div>
            <label>Name: </label>
            <div style={{ textAlign: "start" }}>
              {playerInfo?.firstName} {playerInfo?.lastName}
            </div>
          </div>
          <div>
            <label>Gender: </label> <div>{playerInfo.gender}</div>
          </div>
          <div>
            <label>Date of Birth: </label> <div> {playerInfo?.birthday}</div>
          </div>
          <div>
            <label>Position: </label> <div>{playerInfo?.position}</div>
          </div>
          <div>
            <label>Dominant hand: </label> <div>{playerInfo?.hand}</div>
          </div>
          <div>
            <label>Height: </label> <div>{+playerInfo!.height}</div>
          </div>
          <div>
            <label>Weight: </label> <div>{+playerInfo!.weight}</div>
          </div>
          <div>
            <label>Number: </label> <div>{+playerInfo!.number}</div>
          </div>
          <div>
            <label>Reach Height: </label> <div>{+playerInfo!.reach}</div>
          </div>
          <div>
            <label>Phone: </label> <div>{playerInfo!.telephone}</div>
          </div>
          <div>
            <label>Team: </label> <div>{playerInfo!.team}</div>
          </div>
          <div>
            <img src={playerInfo.photo} alt="" />
          </div>
          <Button type="button" text="Delete Profile" onClick={deletePlayerProfile} />
          {/* <Button type="button" text="Delete Profile" onClick={updatePlayerProfile} /> */}
        </div>
      }
    />
  );
}
