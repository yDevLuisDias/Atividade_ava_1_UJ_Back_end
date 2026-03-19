import type { CreateUserDTO, UpdateUserDTO, User } from "../types/user.js";

const users: User[] = [
  {
    id: "1",
    name: "Ana Mota",
    email: "ana.mota@plataforma.edu",
    role: "student",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Professor Lima",
    email: "lima@plataforma.edu",
    role: "teacher",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function listUsers(): User[] {
  return users;
}

export function findUserById(id: string): User | undefined {
  return users.find((user) => user.id === id);
}

export function createUser(payload: CreateUserDTO): User {
  const now = new Date().toISOString();
  const newUser: User = {
    id: String(users.length + 1),
    name: payload.name,
    email: payload.email,
    role: payload.role,
    active: true,
    createdAt: now,
    updatedAt: now
  };
  users.push(newUser);
  return newUser;
}

export function updateUser(id: string, payload: UpdateUserDTO): User | undefined {
  const user = findUserById(id);
  if (!user) return undefined;

  Object.assign(user, payload, { updatedAt: new Date().toISOString() });
  return user;
}

export function removeUser(id: string): boolean {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}