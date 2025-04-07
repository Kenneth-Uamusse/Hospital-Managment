require("dotenv").config();
import cors from "cors";
import express from "express";
import patientsRouter from "./routes/patients.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/hcm", patientsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
