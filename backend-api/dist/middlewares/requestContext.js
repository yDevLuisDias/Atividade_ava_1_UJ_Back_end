import { randomUUID } from "node:crypto";
export function requestContext(req, res, next) {
    const requestId = req.header("x-request-id") ?? randomUUID();
    res.setHeader("x-request-id", requestId);
    res.setHeader("x-api-version", "1.0");
    next();
}
