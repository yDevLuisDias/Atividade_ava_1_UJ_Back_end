export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  role: "student" | "teacher";
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  role?: "student" | "teacher";
  active?: boolean;
}