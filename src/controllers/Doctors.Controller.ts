import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";

export class DoctorsController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await prisma.doctors.findMany();

      if (doctors.length === 0) {
        res.status(404).json({ message: "No doctors found" });
      } else {
        res.status(200).json(doctors);
      }
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doctor = await prisma.doctors.findUnique({
        where: { id: +req.params.id },
      });

      if (!doctor) throw new HttpError(404, "Doctor not found");

      res.status(200).json(doctor);
    } catch (error) {
      next(error);
    }
  };
}
