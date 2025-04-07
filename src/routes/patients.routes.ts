import { Router } from "express";
import { PatientsController } from "../controllers/Patients.Controller";

const patientsRouter = Router();

const patientsController = new PatientsController()

patientsRouter.get('/patients', patientsController.index)

export default patientsRouter