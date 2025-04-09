import { Router } from "express";
import { DoctorsController } from "../controllers/Doctors.Controller";

const doctorsRouter = Router();

const doctorsController = new DoctorsController();

//DOCTORS
doctorsRouter.get("/doctors", doctorsController.index);
doctorsRouter.get("/doctors/:id", doctorsController.show);
doctorsRouter.post("/doctors", doctorsController.create);
doctorsRouter.put("/doctors/:id", doctorsController.update);
doctorsRouter.delete("/doctors/:id", doctorsController.delete);

//DOCTORS APPOINTMENTS
doctorsRouter.get("/doctors/name/appointments", doctorsController.showAppointments)
export default doctorsRouter;
