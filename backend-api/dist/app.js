import cors from "cors";
import express from "express";
import { requestContext } from "./middlewares/requestContext.js";
import usersRoutes from "./routes/usersRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(requestContext);
app.use(usersRoutes);
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
export default app;
