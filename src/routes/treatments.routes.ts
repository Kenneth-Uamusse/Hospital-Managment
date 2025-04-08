import { Router } from "express";
import { TreatmentsController } from "../controllers/Treatments.Controller";

const treatmentsRouter = Router();

const treatmentsController = new TreatmentsController();

treatmentsRouter.get("/treatments", treatmentsController.index);
treatmentsRouter.get("/treatments/:id", treatmentsController.show);
treatmentsRouter.post("/treatments", treatmentsController.create);
treatmentsRouter.put("/treatments/:id");

export default treatmentsRouter;
