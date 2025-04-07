import { Router } from "express";
import { PatientsController } from "../controllers/Patients.Controller";

const patientsRouter = Router();

const patientsController = new PatientsController();

patientsRouter.get("/patients", patientsController.index);
patientsRouter.post("/patients", patientsController.create);
patientsRouter.get("/patients/:id", patientsController.show);
patientsRouter.put("/patients/:id", patientsController.update);
patientsRouter.delete("/patients/:id", patientsController.delete);

export default patientsRouter;
