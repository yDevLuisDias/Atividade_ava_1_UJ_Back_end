export interface User {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: "Ativo" | "Inativo";
}