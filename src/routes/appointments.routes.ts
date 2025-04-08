import { Router } from "express";
import { AppointmentsController } from "../controllers/Appointments.Controller";

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.get("/appointments", appointmentsController.index);
appointmentsRouter.get("/appointments");
appointmentsRouter.post("/appointments");
appointmentsRouter.put("/appointments");
appointmentsRouter.delete("/appointments");

export default appointmentsRouter;
