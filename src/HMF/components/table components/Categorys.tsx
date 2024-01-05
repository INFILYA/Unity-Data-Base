import { TUserInfo } from "../../../types/Types";
import { Rows } from "./Rows";

type TCategorys = {
  filteredPlayers: TUserInfo[];
  rankByValue<T extends TUserInfo>(criteria: keyof T, arr: T[]): void;
};

export function Categorys(props: TCategorys) {
  const { filteredPlayers, rankByValue } = props;
  const categorys = ["Full Name", "Age", "Position", "Hand", "Height", "Weight", "Number", "Reach"];
  const criterias = [
    "lastName",
    "birthday",
    "position",
    "hand",
    "height",
    "weight",
    "number",
    "reach",
  ];
  return (
    <>
      <tr>
        {categorys.map((category, index) => (
          <th key={category}>
            <button
              onClick={() => rankByValue(criterias[index] as keyof TUserInfo, filteredPlayers)}
              title={`Click to sort by ${category}`}
            >
              {category}
            </button>
          </th>
        ))}
      </tr>
      <Rows filteredPlayers={filteredPlayers} />
    </>
  );
}
