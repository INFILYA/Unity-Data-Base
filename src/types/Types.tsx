import { CSSProperties } from "react";

export type ISectionW = {
  background?: React.ReactNode;
  content: React.ReactNode;
};
export type TBUttonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
};

export type TUserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  team: string;
  position: string;
  birthday: string;
  height: number;
  weight: number;
  number: number;
  telephone: string;
  photo: string;
  reach: number;
  hand: string;
};
