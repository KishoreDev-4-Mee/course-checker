
export type UserRole = "admin" | "student";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}
