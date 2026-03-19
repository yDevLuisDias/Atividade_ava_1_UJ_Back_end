export function makeUserETag(user) {
    return `W/"${user.id}-${new Date(user.updatedAt).getTime()}"`;
}
