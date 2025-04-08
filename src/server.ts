require("dotenv").config();
import cors from "cors";
import express from "express";
import patientsRouter from "./routes/patients.routes";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware";
import doctorsRouter from "./routes/doctors.routes";
import appointmentsRouter from "./routes/appointments.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/hcm", patientsRouter);
app.use("/hcm", doctorsRouter);
app.use("/hcm", appointmentsRouter);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
