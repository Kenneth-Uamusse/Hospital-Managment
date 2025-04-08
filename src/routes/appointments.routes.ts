import { Router } from "express";
import { AppointmentsController } from "../controllers/Appointments.Controller";

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.get("/appointments", appointmentsController.index);
appointmentsRouter.get("/appointments/:id", appointmentsController.show);
appointmentsRouter.post("/appointments", appointmentsController.create);
appointmentsRouter.put("/appointments");
appointmentsRouter.delete("/appointments");

export default appointmentsRouter;
