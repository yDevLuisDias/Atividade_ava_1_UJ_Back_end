import { createUser, findUserById, listUsers, removeUser, updateUser } from "../repositories/userRepository.js";
import { makeUserETag } from "../utils/http.js";
function isValidRole(value) {
    return value === "student" || value === "teacher";
}
function getRouteId(req) {
    const rawId = req.params.id;
    if (typeof rawId !== "string" || rawId.trim() === "") {
        return null;
    }
    return rawId;
}
export function getUsers(_req, res) {
    const users = listUsers();
    res.setHeader("x-total-count", String(users.length));
    res.status(200).json(users);
}
export function getUserById(req, res) {
    const id = getRouteId(req);
    if (!id) {
        res.status(400).json({ message: "Parâmetro id inválido." });
        return;
    }
    const user = findUserById(id);
    if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
    }
    const etag = makeUserETag(user);
    const ifNoneMatch = req.header("if-none-match");
    if (ifNoneMatch && ifNoneMatch === etag) {
        res.status(304).end();
        return;
    }
    res.setHeader("etag", etag);
    res.setHeader("last-modified", new Date(user.updatedAt).toUTCString());
    res.status(200).json(user);
}
export function postUser(req, res) {
    const payload = req.body;
    if (!payload.name || !payload.email || !isValidRole(payload.role)) {
        res.status(400).json({
            message: "Payload inválido. Campos obrigatórios: name, email e role(student|teacher)."
        });
        return;
    }
    const created = createUser({
        name: payload.name,
        email: payload.email,
        role: payload.role
    });
    res.setHeader("location", `/users/${created.id}`);
    res.status(201).json(created);
}
export function putUser(req, res) {
    const id = getRouteId(req);
    if (!id) {
        res.status(400).json({ message: "Parâmetro id inválido." });
        return;
    }
    const payload = req.body;
    if (payload.role !== undefined && !isValidRole(payload.role)) {
        res.status(400).json({ message: "Campo role deve ser student ou teacher." });
        return;
    }
    const updated = updateUser(id, payload);
    if (!updated) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
    }
    res.status(200).json(updated);
}
export function deleteUser(req, res) {
    const id = getRouteId(req);
    if (!id) {
        res.status(400).json({ message: "Parâmetro id inválido." });
        return;
    }
    const removed = removeUser(id);
    if (!removed) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
    }
    res.status(204).end();
}
