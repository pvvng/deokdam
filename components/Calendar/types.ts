export interface Dates {
  date: Date;
  type: DatesType;
}

export type DatesType = "prev" | "current" | "next";
