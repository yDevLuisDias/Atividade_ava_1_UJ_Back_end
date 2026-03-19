import type { User } from "../types/user.js";

export function makeUserETag(user: User): string {
  return `W/"${user.id}-${new Date(user.updatedAt).getTime()}"`;
}