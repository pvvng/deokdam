export interface Deokdam {
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  payload: string;
  openAt: Date;
  isPublic: boolean;
  token: string | null;
}
