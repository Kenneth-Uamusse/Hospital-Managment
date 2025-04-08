import { Router } from "express";

const treatmentsRouter = Router();

treatmentsRouter.get("/treatments")
treatmentsRouter.get("/treatments/:id")
treatmentsRouter.post("/treatments")
treatmentsRouter.put("/treatments/:id")

export default treatmentsRouter