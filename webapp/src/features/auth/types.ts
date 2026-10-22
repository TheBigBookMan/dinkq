export type UserType = "ORGANISER" | "USER" | "GUEST";

export type UserData = {
  name: string;
  imageURL: string;
  rating: number | null;
}