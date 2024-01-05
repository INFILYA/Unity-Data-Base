import { TUserInfo } from "../../../types/Types";
import { upgradeAge } from "../../../utilities/functions";

type TRows = {
  filteredPlayers: TUserInfo[];
};

export function Rows(props: TRows) {
  const { filteredPlayers } = props;

  return (
    <>
      {filteredPlayers.map((player, index) => (
        <tr key={player.email} className="rating-row">
          <td className="rating-player-name" style={{ textAlign: "start" }}>
            {index + 1}. {player.firstName} {player.lastName}
          </td>
          <td>{upgradeAge(player).birthday}</td>
          <td>{player.position}</td>
          <td>{player.hand}</td>
          <td>{+player.height}</td>
          <td>{+player.weight}</td>
          <td>{+player.number}</td>
          <td>{+player.reach}</td>
        </tr>
      ))}
    </>
  );
}
