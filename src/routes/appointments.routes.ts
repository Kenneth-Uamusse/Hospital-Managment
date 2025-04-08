import { Router } from "express";

const appointmentsRouter = Router();

appointmentsRouter.get("/appointments");
appointmentsRouter.get("/appointments");
appointmentsRouter.post("/appointments");
appointmentsRouter.put("/appointments");
appointmentsRouter.delete("/appointments");

export default appointmentsRouter;
