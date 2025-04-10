import { Router } from "express";
import { AppointmentsController } from "../controllers/Appointments.Controller";

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

//APPOINTMENTS
appointmentsRouter.get("/appointments", appointmentsController.index);
appointmentsRouter.get("/appointments/:id", appointmentsController.show);
appointmentsRouter.post("/appointments", appointmentsController.create);
appointmentsRouter.put("/appointments/:id", appointmentsController.update);

//APPOINTMENT BY DATE
appointmentsRouter.get(
  "/appointments/date/show",
  appointmentsController.showByDate
);

export default appointmentsRouter;
