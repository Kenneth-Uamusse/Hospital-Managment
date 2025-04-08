import { Router } from "express";

const doctorsRouter = Router();

doctorsRouter.get("/doctors");
doctorsRouter.get("/doctors/:id");
doctorsRouter.post("/doctors");
doctorsRouter.put("/doctors/:id");
doctorsRouter.delete("/doctors/:id");

export default doctorsRouter;
