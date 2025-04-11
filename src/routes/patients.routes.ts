import { Router } from "express";
import { PatientsController } from "../controllers/Patients.Controller";

const patientsRouter = Router();

const patientsController = new PatientsController();

//PATIENTS
patientsRouter.get("/patients", patientsController.index);
patientsRouter.post("/patients", patientsController.create);
patientsRouter.get("/patients/:id", patientsController.show);
patientsRouter.put("/patients/:id", patientsController.update);
patientsRouter.delete("/patients/:id", patientsController.delete);

//PATIENTS APPOINTMENTS
patientsRouter.get(
  "/patients/:id/appointments",
  patientsController.showAppointments
);

//APPOINTMENTS BY DOCTOR SPECIALIZATION
patientsRouter.get(
  "/patients/:id/appointments/doctor",
  patientsController.showAppointmentsByDoctorSpecialization
);

export default patientsRouter;
