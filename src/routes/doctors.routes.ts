import { Router } from "express";
import { DoctorsController } from "../controllers/Doctors.Controller";

const doctorsRouter = Router();

const doctorsController = new DoctorsController()

doctorsRouter.get("/doctors", doctorsController.index);
doctorsRouter.get("/doctors/:id");
doctorsRouter.post("/doctors");
doctorsRouter.put("/doctors/:id");
doctorsRouter.delete("/doctors/:id");

export default doctorsRouter;
