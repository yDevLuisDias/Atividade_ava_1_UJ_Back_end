import { Router } from "express";
import { deleteUser, getUserById, getUsers, postUser, putUser } from "../controllers/usersController.js";
const usersRoutes = Router();
usersRoutes.get("/users", getUsers);
usersRoutes.get("/users/:id", getUserById);
usersRoutes.post("/users", postUser);
usersRoutes.put("/users/:id", putUser);
usersRoutes.delete("/users/:id", deleteUser);
export default usersRoutes;
